# frozen_string_literal: true

class LineBot::CallbacksController < ApplicationController
  class SearchNearestStationError < StandardError; end
  class EkiSpertClientError < StandardError; end

  def callback # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    type = params['events'].first['type']
    result = params['events'].first.dig('link', 'result')
    line_nonce = params['events'].first.dig('link', 'nonce')
    line_user_id = params['events'].first['source']['userId']
    message = params['events'].first.dig('message', 'text')

    return if %w[unfollow leave memberLeft accountLink].include?(type)

    # トークルームにメッセージが送られてきたときの処理
    if type == 'message'
      user = User.find_by(line_user_id:)
      # ユーザーが登録されていない場合は、ログイン画面へのリンクを送信
      if user.nil?
        line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "こちらの URL からログインを行い、ユーザー登録を完了してください！\n#{ENV["FRONT_URI"]}/signin"
          }
        )
        return render_unauthorized_error('', 'Not found user')
      end

      if message == 'AIとチャット'
        user.user_setting.chat_with_ai!
        line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "困ったことがあったらAIに聞いてみよう！\n何でも答えてくれます🤖"
          }
        )
        return render json: {}, status: :ok
      elsif message == 'チャットでリマインド登録'
        user.user_setting.create_notice!
        line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "リマインドの内容を入力してください↓\n例) 明日の9時に美容院にいく"
          }
        )
        return render json: {}, status: :ok
      elsif message == 'お店の名前から経路検索'
        user.user_setting.route_search!
        line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "お店の名前を入力してください↓\n例) 鳥貴族 葛西"
          }
        )
        return render json: {}, status: :ok
      end

      if user.user_setting.create_notice?
        response = openai_client.chat(
          parameters: {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: generate_question_for_notice(message:) }],
            max_tokens: 100
          }
        )
        response_json = JSON.parse(response['choices'].first['message']['content'])
        notice = Notice.new(
          user_id: user.id,
          talk_type: 'dm',
          title: response_json['title'],
          message: "",
          scheduled_at: response_json['scheduled_at'],
          status: 'draft',
          to_line_id: user.line_user_id,
          repeat: false
        )
        notice.save!(context: :input_by_user)
        line_bot_client.reply_message(params['events'].first['replyToken'], draft_notice_message(notice))
      elsif user.user_setting.chat_with_ai?
        begin
          ActiveRecord::Base.transaction do
            monthly_message_metrics = user.monthly_message_metrics.find_or_create_by(year: Time.current.year, month: Time.current.month)
            monthly_message_metrics.increment!(:chatgpt_usage_count)
            past_messages = user.chatgpt_messages.order(created_at: :desc).limit(4).map { |m| { role: m.role, content: m.message } }
            user.chatgpt_messages.create!(message: message, role: 'user')

            # OpenAI API を叩く
            response = openai_client.chat(
              parameters: {
                model: 'gpt-3.5-turbo',
                messages: [
                  { role: 'system', content: 'You are the AI assistant who answers many times' },
                  *past_messages,
                  { role: 'user', content: message }
                ]
              }
            )
            reply_message = response['choices'].first['message']['content'].delete_prefix("\n\n")
            user.chatgpt_messages.create!(message: reply_message, role: 'assistant')
            line_bot_client.reply_message(
            params['events'].first['replyToken'],
              {
                type: 'text',
                text: reply_message
              }
            )
          end
        rescue => e
          line_bot_client.reply_message(
            params['events'].first['replyToken'],
            {
              type: 'text',
              text: "エラーが発生しました。しばらくしてから再度お試しください。"
            }
          )
          ErrorUtility.logger(e)
          return
        end
      elsif user.user_setting.route_search?
        # response:
        # {"name"=>"鳥貴族 三田駅前店", "station"=>"JR三田駅"}
        res = saerch_nearest_station_conn.get('/', { input: message })
        unless res.status == 200
          reply_error_message(params['events'].first['replyToken'], "エラーが発生しました。お店の情報をもう少し追加して送信してみてください🙏")
          raise SearchNearestStationError.new("Error: #{res.status} #{res.body} Bery's Error")
        end

        nearest_station = JSON.parse(res.body)
        Rails.logger.info nearest_station
        station_name = nearest_station['station'].chomp("駅")
        # response:
        # {"ResultSet"=>
        #   {"apiVersion"=>"1.27.0.0",
        #     "engineVersion"=>"202304_02a",
        #     "Point"=>
        #      {"Station"=>{"code"=>"22715", "Name"=>"渋谷", "Type"=>"train", "Yomi"=>"しぶや"},
        #       "Prefecture"=>{"code"=>"13", "Name"=>"東京都"}}}}
        # or
        # {"ResultSet"=>
        #   {"apiVersion"=>"1.27.0.0", "engineVersion"=>"202304_02a", "Point"=>
        #     [{"Station"=>{"code"=>"22592", "Name"=>"葛西", "Type"=>"train", "Yomi"=>"かさい"}, "Prefecture"=>{"code"=>"13", "Name"=>"東京都"}}, {"Station"=>{"code"=>"22593", "Name"=>"葛西臨海公園", "Type"=>"train", "Yomi"=>"かさいりんかいこうえん"}, "Prefecture"=>{"code"=>"13", "Name"=>"東京都"}}]}}
        res = ekispert_conn.get('/v1/json/station/light', { name: station_name })
        unless res.status == 200
          reply_error_message(params['events'].first['replyToken'], "エラーが発生しました。しばらくしてから再度お試しください。")
          raise EkiSpertClientError.new("Error: #{res.status} #{res.body}")
        end

        station_info = JSON.parse(res.body)
        Rails.logger.info station_info

        if station_info['ResultSet']['Point'].nil?
          reply_error_message(params['events'].first['replyToken'], "エラーが発生しました。しばらくしてから再度お試しください。")
          raise EkiSpertClientError.new("Not Found Station Info: #{res.status} #{res.body}")
        end
        station_code = station_info['ResultSet']['Point'].is_a?(Array) ? station_info['ResultSet']['Point'].first['Station']['code'] : station_info['ResultSet']['Point']['Station']['code']
        station_name = station_info['ResultSet']['Point'].is_a?(Array) ? station_info['ResultSet']['Point'].first['Station']['Name'] : station_info['ResultSet']['Point']['Station']['Name']
        # response:
        # {"ResultSet"=>
        #   {"apiVersion"=>"1.27.0.0",
        #     "engineVersion"=>"202304_02a",
        #     "ResourceURI"=>
        #      "https://roote.ekispert.net/result?arr=%E6%B8%8B%E8%B0%B7&arr_code=22715&connect=true&dep=%E6%B5%A6%E5%AE%89(%E5%8D%83%E8%91%89%E7%9C%8C)&dep_code=22206&express=true&highway=true&hour&liner=true&local=true&minute&plane=true&shinkansen=true&ship=true&sleep=false&sort=time&surcharge=3&type=dep&via1=&via1_code=&via2=&via2_code="}}
        res = ekispert_conn.get('/v1/json/search/course/light', { from: 22206, to: station_code })
        unless res.status == 200
          reply_error_message(params['events'].first['replyToken'], "エラーが発生しました。しばらくしてから再度お試しください。")
          raise EkiSpertClientError.new("Error: #{res.status} #{res.body}")
        end
        course_url = JSON.parse(res.body)['ResultSet']['ResourceURI']

        res = line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "お店: #{nearest_station["name"]}\n最寄り駅: #{station_name}\n経路: #{course_url}"
          }
        )
      end
      return render json: {}, status: :ok
    end

    # Postback が送られてきたときの処理
    if type == 'postback'
      data = JSON.parse(params['events'].first['postback']['data'])
      notice = Notice.find(data['notice_id'])
      Notice.transaction do
        notice.scheduled!
        Notices::SetJobService.new(notice).execute!
      end
      line_bot_client.reply_message(
        params['events'].first['replyToken'],
        {
          type: 'text',
          text: "[#{notice.title}] のリマインドを設定しました🚀！"
        }
      )
      return render json: {}, status: :ok
    end

    # グループラインに参加したときの処理
    if type == 'join'
      line_group_id = params['events'].first['source']['groupId']
      message = [{
        "type": 'template',
        "altText": '今すぐアカウント連携する🚀',
        "template": {
          "type": 'buttons',
          "text": 'Muchaからメッセージを受け取るために「今すぐ認証する」をクリックしてください👋',
          "actions": [{
            "type": 'uri',
            "label": '今すぐ認証する',
            "uri": "#{ENV['FRONT_URI']}/line-account-linkage?linkToken=aaa&talkType=groupTalk&lineGroupId=#{line_group_id}"
          }]
        }
      }]
      res = line_bot_client.push_message(line_group_id, message)
      return render json: {}, status: :ok
    end

  rescue JSON::ParserError => e
    ErrorUtility.logger(e)
  rescue SearchNearestStationError => e
    ErrorUtility.logger(e)
  rescue EkiSpertClientError => e
    ErrorUtility.logger(e)
  rescue => e
    ErrorUtility.logger(e)
  end

  private def line_bot_client
    @line_bot_client ||= Line::Bot::Client.new do |config|
      config.channel_id = ENV['LINE_CHANNEL_ID']
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
    end
  end

  private def openai_client
    @openai_client ||= OpenAI::Client.new
  end

  private def saerch_nearest_station_conn
    Faraday.new(
      url: ENV['SEARCH_NEAREST_STATION_API']
    )
  end

  private def ekispert_conn
    Faraday.new(
      url: ENV['EKISPERT_API_URL'],
      headers: {'Accept' => 'application/json'},
      params: {
        key: ENV['EKISPERT_API_KEY'],
        gcs: 'tokyo'
      }
    )
  end

  private def reply_error_message(reply_token, message)
    line_bot_client.reply_message(
      reply_token,
      {
        type: 'text',
        text: message
      }
    )
  end

  private def generate_question_for_notice(message:)
    "「#{message}」の内容でリマインドを設定するための「title」、「scheduled_at」のJSON形式で変換してください。今日の日付を#{Time.current}とします。JSONのみを出力してください。"
  end

  private def draft_notice_message(notice)
    {
      "type": 'flex',
      "altText": 'リマインド 下書き',
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "リマインド下書き",
              "weight": "bold",
              "size": "lg"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "タイトル",
                      "color": "#aaaaaa",
                      "size": "sm"
                    },
                    {
                      "type": "text",
                      "text": notice.title,
                      "color": "#666666"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "日時",
                      "color": "#aaaaaa",
                      "size": "sm"
                    },
                    {
                      "type": "text",
                      "text": notice.scheduled_at.strftime('%Y年%m月%d日 %H時%M分'),
                      "wrap": true,
                      "color": "#666666"
                    }
                  ]
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "登録する",
                "data": {
                  "notice_id": notice.id,
                  "status": "scheduled"
                }.to_json
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "編集する",
                "uri": "https://muchualchat.com/notices/#{notice.id}/edit"
              }
            }
          ]
        }
      }
    }
  end
end

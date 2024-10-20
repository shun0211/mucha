# frozen_string_literal: true

class LineBot::CallbacksController < ApplicationController
  OPENAI_MODEL = 'gpt-4o-mini'

  class SearchNearestStationError < StandardError; end
  class EkiSpertClientError < StandardError; end
  class OpenAIError < StandardError; end

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
            text: "困ったことがあったらAIに聞いてみよう！\n何でも答えてくれます🤖",
            "quickReply": {
              "items": [
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "空いている日程を提案",
                    "text": "空いている日程を提案"
                  }
                }
              ]
            }
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
      elsif message == '買い物リスト追加'
        user.user_setting.create_shopping_list!
        line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "買い物リストを入力してください↓\n例) シャンプー"
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

            display_line_loading_animation(user.line_user_id)

            future_schedules = user.schedules.where('start_time >= ?', Time.zone.now)
            future_schedules_json = future_schedules.to_json(only: [:id, :start_time, :end_time, :title, :all_day])

            response = openai_client.chat(
              parameters: {
                model: OPENAI_MODEL,
                response_format: { type: "json_object" },
                messages: [
                  { role: 'system', content: calendar_suggestion_system_prompt(future_schedules_json) },
                  { role: 'user', content: message }
                ]
              }
            )

            ai_response_content = response['choices'].first['message']['content'].strip.gsub('\n', '')
            json_suggestions = JSON.parse(ai_response_content)
            reply_message = format_suggestion(json_suggestions)

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
          raise SearchNearestStationError.new("Error: #{res.status} #{res.body}")
        end

        nearest_station = JSON.parse(res.body)
        Rails.logger.info nearest_station
        station_name = nearest_station['station'].chomp("駅")
        station = Station.search_by_name(station_name).first
        # response:
        # {"ResultSet"=>
        #   {"apiVersion"=>"1.27.0.0",
        #     "engineVersion"=>"202304_02a",
        #     "ResourceURI"=>
        #      "https://roote.ekispert.net/result?arr=%E6%B8%8B%E8%B0%B7&arr_code=22715&connect=true&dep=%E6%B5%A6%E5%AE%89(%E5%8D%83%E8%91%89%E7%9C%8C)&dep_code=22206&express=true&highway=true&hour&liner=true&local=true&minute&plane=true&shinkansen=true&ship=true&sleep=false&sort=time&surcharge=3&type=dep&via1=&via1_code=&via2=&via2_code="}}
        res = ekispert_conn.get('/v1/json/search/course/light', { from: 22828, to: station.code })
        unless res.status == 200
          reply_error_message(params['events'].first['replyToken'], "エラーが発生しました。しばらくしてから再度お試しください。")
          raise EkiSpertClientError.new("Error: #{res.status} #{res.body}")
        end
        course_url = JSON.parse(res.body)['ResultSet']['ResourceURI']

        res = line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "お店: #{nearest_station["name"]}\n最寄り駅: #{station.name}\n経路: #{course_url}"
          }
        )
      elsif user.user_setting.create_shopping_list?
        # 「list」or「一覧」が送られてきたときは、買い物リストを返す
        if message.include?('list') || message.include?('一覧')
          shopping_lists = user.shopping_lists.where(is_done: false).order(disp_order: :asc)
          if shopping_lists.empty?
            line_bot_client.reply_message(
              params['events'].first['replyToken'],
              {
                type: 'text',
                text: "買い物リストはありません🛒"
              }
            )
          else
            message = shopping_lists.map { |list| "・#{list.name}" }.join("\n")
            line_bot_client.reply_message(
              params['events'].first['replyToken'],
              {
                type: 'text',
                text: message
              }
            )
          end
          return render json: {}, status: :ok
        end

        user.shopping_lists.create!(
          name: message,
          disp_order: (user.shopping_lists.maximum(:disp_order) || 0) + 1,
          is_done: false
        )
        line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: "買い物リストに「#{message}」を追加しました🛒"
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

  private def display_line_loading_animation(line_user_id)
    uri = URI.parse('https://api.line.me/v2/bot/chat/loading/start')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{ENV['LINE_CHANNEL_TOKEN']}"
    request.body = {
      chatId: line_user_id,
      loadingSeconds: 60
    }.to_json

    response = http.request(request)

    unless response.is_a?(Net::HTTPSuccess)
      Rails.logger.error "Failed to start loading: #{response.code} #{response.message}"
    end
  end

  private def calendar_suggestion_system_prompt(json_data)
    <<~PROMPT
      Googleカレンダーに登録された予定を基に、#{Time.current.beginning_of_day}から5日間の09:00から21:00の間で空いている時間を正確にすべて抽出してください。この提案では、以下の条件を考慮してください。

      - 予定の内容を確認し、外での予定と推測される場合には、その前後1時間を空けた時間帯で提案してください。
      - 重複する時間枠や連続する時間は避けてください。

      以下が、今日以降のGoogleカレンダーの予定です：

      #{json_data}

      # Steps

      1. Googleカレンダーの予定を読み込み、#{Time.current.beginning_of_day}から5日間のスケジュールを把握します。
      2. 各予定の名前を確認し、外出が予想される予定を特定します。
      3. 各日について09:00から21:00の間で空いている時間を探します。
         - 外出予定の場合、その前後1時間を避けます。
      4. 見つけた空いている時間を出力します。

      # Output Format

      - 提案のフォーマットは下例に示すJSON形式です。
      - 空いている時間のみ出力するようにしてください。

      # Output Examples

      ```json
      {
        "suggestions": [
          {
            "date": "2024-10-01",
            "start_time": "10:00",
            "end_time": "12:00"
          },
          {
            "date": "2024-10-02",
            "start_time": "13:00",
            "end_time": "15:00"
          }
        ]
      }
      ```

      # Notes

      - 重複や連続する時間は避けてください。
      - 全ての予定が外出予定とされるわけではない点に注意してください。
      - **空いている時間のみ出力**するようにしてください。
    PROMPT
  end

  private def format_suggestion(suggestions)
    suggestions['suggestions'].map do |suggestion|
      formatted_date = format_date(suggestion['date'])
      start_time = suggestion['start_time']
      end_time = suggestion['end_time']
      "#{formatted_date} #{start_time} - #{end_time}"
    end.join("\n")
  end

  private def format_date(date_str)
    date = Date.parse(date_str)
    date.strftime("%m月%d日") + "(" + %w(日 月 火 水 木 金 土)[date.wday] + ")"
  end
end

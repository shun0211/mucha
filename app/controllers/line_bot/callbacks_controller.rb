# frozen_string_literal: true

class LineBot::CallbacksController < ApplicationController
  def callback # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    type = params['events'].first['type']
    result = params['events'].first.dig('link', 'result')
    line_nonce = params['events'].first.dig('link', 'nonce')
    line_user_id = params['events'].first['source']['userId']
    message = params['events'].first.dig('message', 'text')

    return if %w[unfollow leave memberLeft accountLink].include?(type)

    # トークルームにメッセージが送られてきたときの処理
    if type == 'message'
      response = openai_client.chat(
        parameters: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: generate_question(message:) }],
          max_tokens: 100
        }
      )
      response_json = JSON.parse(response['choices'].first['message']['content'])

      user = User.find_by!(line_user_id:)
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
      line_bot_client.reply_message(params['events'].first['replyToken'], build_message(notice))
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

  private def generate_question(message:)
    "「#{message}」の内容でリマインドを設定するための「title」、「scheduled_at」のJSON形式で変換してください。今日の日付を#{Time.current}とします。JSONのみを出力してください。"
  end

  private def build_message(notice)
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

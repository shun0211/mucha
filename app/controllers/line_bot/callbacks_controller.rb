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
        monthly_message_metrics = user.monthly_message_metrics.find_or_create_by(year: Time.current.year, month: Time.current.month)
        monthly_message_metrics.increment!(:chatgpt_usage_count)
        response = openai_client.chat(
          parameters: {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
          }
        )
        reply_message = response['choices'].first['message']['content'].delete_prefix("\n\n")
        line_bot_client.reply_message(
          params['events'].first['replyToken'],
          {
            type: 'text',
            text: reply_message
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

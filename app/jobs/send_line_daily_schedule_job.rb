class SendLineDailyScheduleJob
  include Sidekiq::Worker
  queue_as :default

  def perform
    User.find_each do |user|
      if user.user_setting.send_line_daily_schedule && user.notices.within(Time.current).exists?
        line_bot_client.push_message(user.line_user_id, build_message(user))
      end
    end
  end

  private def line_bot_client
    @line_bot_client ||= Line::Bot::Client.new do |config|
      config.channel_id = ENV['LINE_CHANNEL_ID']
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
    end
  end

  private def build_message(user)
    {
      "type": "flex",
      "altText": "今日の予定です！ 今日も一日頑張っていきましょう😊",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://mucha.s3.ap-northeast-1.amazonaws.com/good-morning-removebg.png",
          "aspectMode": "cover",
          "size": "4xl"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "今日の予定",
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": build_contents(user)
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "今日もいい一日になりますように！☀️",
              "size": "md",
              "margin": "none"
            },
            {
              "type": "text",
              "text": "※ 通知は設定からオフにできます。",
              "size": "sm",
              "offsetTop": "sm"
            }
          ],
          "paddingStart": "xxl",
          "paddingBottom": "xxl",
          "offsetBottom": "md"
        },
        "styles": {
          "hero": {
            "backgroundColor": "#fdf5e6"
          }
        }
      }
    }
  end

  private def build_contents(user)
    contents = []
    user.notices.within(Time.current).each do |notice|
      if notice.none_source?
        contents.push(
          {
            "type": "text",
            "text": notice.title,
            "size": "lg"
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "時間",
                "color": "#aaaaaa",
                "size": "lg",
                "flex": 1
              },
              {
                "type": "text",
                "text": notice.scheduled_at.strftime('%H:%M'),
                "wrap": true,
                "color": "#666666",
                "size": "lg",
                "flex": 5
              }
            ]
          }
        )
        next
      end

      if notice.google_calendar_source?
        contents.push(
          {
            "type": "text",
            "text": notice.schedule.title,
            "size": "md"
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "時間",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": notice.schedule.booking_time,
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
          }
        )
      end
    end

    contents
  end
end

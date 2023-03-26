class SendLineDailyScheduleJob
  include Sidekiq::Worker
  queue_as :default

  def perform
    User.find_each do |user|
      if user.user_setting.send_line_daily_schedule && user.notices.within(Time.current).exists?
        res = weather_conn.get('/api/forecast', { city: 130010 })
        @weather_info = JSON.parse(res.body)
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
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "今日の予定 ",
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
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "天気",
                  "flex": 1,
                  "size": "lg"
                },
                {
                  "type": "text",
                  "text": @weather_info["forecasts"][0]["telop"],
                  "flex": 1,
                  "size": "lg"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "最高/最低(℃)",
                  "flex": 1,
                  "size": "lg"
                },
                {
                  "type": "text",
                  "text": "#{@weather_info["forecasts"][0]["temperature"]["max"]["celsius"] ? @weather_info["forecasts"][0]["temperature"]["max"]["celsius"] : "-"}/#{@weather_info["forecasts"][0]["temperature"]["min"]["celsius"] ? @weather_info["forecasts"][0]["temperature"]["max"]["celsius"] : "-"}℃",
                  "flex": 1,
                  "size": "lg"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "降水確率(%)",
                  "flex": 1,
                  "size": "lg"
                },
                {
                  "type": "text",
                  "text": "#{@weather_info["forecasts"][0]["chanceOfRain"]["T00_06"].chop}/#{@weather_info["forecasts"][0]["chanceOfRain"]["T06_12"].chop}/#{@weather_info["forecasts"][0]["chanceOfRain"]["T12_18"].chop}/#{@weather_info["forecasts"][0]["chanceOfRain"]["T18_24"].chop}",
                  "size": "lg"
                }
              ]
            },
            {
              "type": "text",
              "text": "今日もいい一日になりますように🔥",
              "size": "md",
              "margin": "lg"
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

  def weather_conn
    Faraday.new(
      url: 'https://weather.tsukumijima.net'
    )
  end
end

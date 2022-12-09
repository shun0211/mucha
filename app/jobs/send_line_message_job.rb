class SendLineMessageJob < ApplicationJob
  def perform(notice)
    message = {
      type: 'text',
      text: notice.message
    }
    line_bot_client.push_message(notice.to_line_id, message)
    notice.sent!
  end

  private def line_bot_client
    @line_bot_client ||= Line::Bot::Client.new do |config|
      config.channel_id = ENV['LINE_CHANNEL_ID']
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
    end
  end
end

class SendLineMessageJob
  include Sidekiq::Worker
  queue_as :default

  def perform(notice_id)
    notice = Notice.find(notice_id)
    message = {
      type: 'text',
      text: build_message_text(notice)
    }
    line_bot_client.push_message(notice.to_line_id, message)

    line_message_job = notice.line_message_jobs.find_by(job_id: self.jid)
    Notice.transaction do
      line_message_job.destroy!
      if notice.line_message_jobs.exists?
        next_scheduled_at = notice.line_message_jobs.minimum(:scheduled_at)
        notice.scheduled_at = next_scheduled_at
        notice.save!
      else
        notice.sent!
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

  private def build_message_text(notice)
    message = case notice.talk_type
              when "dm"
                <<-"MESSAGE".gsub(/^\s+/, '').chomp
                  [#{notice.title}]
                  #{notice.message}
                  　
                  リマインドのお知らせです😊
                MESSAGE
              when "groupTalk"
                notice.message << "\n\n" + notice.user.line_name + " より"
              end

    message
  end
end

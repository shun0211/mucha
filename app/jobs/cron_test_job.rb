class CronTestJob
  include Sidekiq::Worker
  queue_as :default

  def perform
    notifier.ping "Corn is working correctly!!"
  end

  private def notifier
    Slack::Notifier.new(ENV['SLACK_MUCHA_DATA_CHECK_DAILY_WEB_HOOK_URL'], username: 'Cron Checker', icon_emoji: ':simple_smile:')
  end
end

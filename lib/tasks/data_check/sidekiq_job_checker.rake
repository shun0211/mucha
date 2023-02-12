# frozen_string_literal: true

namespace :verify_line_message_job_and_scheduled_job do
  desc 'データベースに保存された LineMessageJob のレコードと Sidekiq に予定されている Job の数が一致するか確認する'
  task exec: :environment do |_task|
    ss = Sidekiq::ScheduledSet.new
    jobs = ss.scan("SendLineMessageJob").select {|job| job.klass == 'SendLineMessageJob' }
    scheduled_line_message_jobs = LineMessageJob.where(scheduled_at: Time.current..).to_a
    if jobs.count == scheduled_line_message_jobs.count
      notifier.post attachments: success_message(jobs.count)
    else
      unset_line_message_jobs = scheduled_line_message_jobs.reject{|lmj| jobs.map{|job| job.item['jid']}.include?(lmj.job_id)}
      notifier.post attachments: failure_message(jobs.count, scheduled_line_message_jobs.count, unset_line_message_jobs)
    end
  end

  private def notifier
    Slack::Notifier.new(ENV['SLACK_MUCHA_DATA_CHECK_DAILY_WEB_HOOK_URL'], username: 'Data Checker', icon_emoji: ':sunglasses:')
  end

  private def success_message(job_count)
    {
      "color": "#00ff00",
      "pretext": "#{Rails.env} #{Time.current} 実行のチェック結果",
      "fields": [
        {
          "value": "🎉 データベースに保存された LineMessageJob のレコードと Sidekiq に予定されている Job の数が一致しています\n予定されている Job 数: #{job_count}"
        }]
    }
  end

  private def failure_message(scheduled_job_count, line_message_job_record_count, unset_line_message_jobs)
    {
      "color": "#ff4500",
      "pretext": "<!here> #{Rails.env} #{Time.current} 実行のチェック結果",
      "fields": [
        {
          "value": failure_message_value(scheduled_job_count, line_message_job_record_count, unset_line_message_jobs)
        }]
    }
  end

  private def failure_message_value(scheduled_job_count, line_message_job_record_count, unset_line_message_jobs)
    <<-"MESSAGE".gsub(/^\s+/, '').chomp
      😱 データベースに保存された LineMessageJob のレコードと Sidekiq に予定されている Job の数が一致しません
      ```
      予定されている Job 数: #{scheduled_job_count}
      LineMessageJob レコード数: #{line_message_job_record_count}
      登録されていない line_message_job_ids: #{unset_line_message_jobs.map(&:id)}
      ```
    MESSAGE
  end
end

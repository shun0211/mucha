# USAGE:
# bundle exec rails runner 'load "script/data_patch/20230213_refresh_job.rb"; DataPatch::RefreshJob.new.execute!'

module DataPatch
  class RefreshJob
    def initialize
      @logger = Logger.new("#{Rails.root}/log/refresh_job.log")
    end

    def execute!
      scheduled_line_message_jobs = LineMessageJob.where(scheduled_at: Time.current..).to_a
      ss = Sidekiq::ScheduledSet.new

      puts '【実行前】'
      puts "LineMessage #{scheduled_line_message_jobs.count}件"
      puts "登録されている Job #{ss.count}件"

      puts "処理を開始します ... [y/n]"
      exit if STDIN.gets.strip != 'y'
      puts '****************************************************************************************************'
      puts '【処理開始】'
      @logger.info('Start')

      puts 'Job の削除'
      ss.clear

      puts 'Job の登録'
      scheduled_line_message_jobs.each do |job|
        job_id = SendLineMessageJob
          .set(wait_until: job.scheduled_at)
          .perform_async(job.notice_id)
        job.job_id = job_id
        job.save!
      end

      puts '【実行後】'
      puts "LineMessage #{scheduled_line_message_jobs.count}件"
      puts "登録されている Job #{ss.count}件"

      puts '【処理完了】'
      puts '****************************************************************************************************'
      @logger.info('End')
    end
  end
end

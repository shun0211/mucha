# USAGE:
# bundle exec rails runner 'load "script/data_patch/20230214_modify_scheduled_at.rb"; DataPatch::ModifyScheduledAt.new.execute!'

module DataPatch
  class ModifyScheduledAt
    def initialize
      @logger = Logger.new("#{Rails.root}/log/modify_scheduled_at.log")
    end

    def execute!
      scheduled_notices = Notice.where(scheduled_at: Time.current..).to_a
      scheduled_line_message_jobs = LineMessageJob.where(scheduled_at: Time.current..).to_a

      puts '【実行前】'
      # 件数
      puts "Notice #{scheduled_notices.count}件"
      puts "LineMessage #{scheduled_line_message_jobs.count}件"

      puts '対象となる Notice の情報'
      puts "#{scheduled_notices.map{|notice| puts "id: #{notice.id}, scheduled_at: #{notice.scheduled_at}"}}"

      puts '対象となる LineMessageJob の情報'
      puts "#{scheduled_line_message_jobs.map{|job| puts "id: #{job.id}, scheduled_at: #{job.scheduled_at}"}}"

      puts "処理を開始します ... [y/n]"
      exit if STDIN.gets.strip != 'y'
      puts '****************************************************************************************************'
      puts '【処理開始】'
      @logger.info('Start')

      puts 'Notice の修正'
      Notice.transaction do
        scheduled_notices.each do |notice|
          before_scheduled_at = notice.scheduled_at
          notice.scheduled_at = before_scheduled_at + 9.hours
          notice.save!
        end
      end

      puts 'LineMessageJob の修正'
      LineMessageJob.transaction do
        scheduled_line_message_jobs.each do |job|
          before_scheduled_at = job.scheduled_at
          job.scheduled_at = before_scheduled_at + 9.hours
          job.save!
        end
      end

      puts '【実行後】'
      after_datapatch_scheduled_notices = Notice.where(scheduled_at: Time.current..).to_a
      after_datapatch_scheduled_line_message_jobs = LineMessageJob.where(scheduled_at: Time.current..).to_a

      # 件数
      puts "Notice #{after_datapatch_scheduled_notices.count}件"
      puts "LineMessage #{after_datapatch_scheduled_line_message_jobs.count}件"

      puts '対象となる Notice の情報'
      puts "#{after_datapatch_scheduled_notices.map{|notice| puts "id: #{notice.id}, scheduled_at: #{notice.scheduled_at}"}}"

      puts '対象となる LineMessageJob の情報'
      puts "#{after_datapatch_scheduled_line_message_jobs.map{|job| puts "id: #{job.id}, scheduled_at: #{job.scheduled_at}"}}"

      puts '【処理完了】'
      puts '****************************************************************************************************'
      @logger.info('End')
    end
  end
end

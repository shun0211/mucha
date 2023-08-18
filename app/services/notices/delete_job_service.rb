# Notice に関連する Job をすべて取り消すサービス
class Notices::DeleteJobService
  require 'sidekiq/api'

  def initialize(notice)
    @notice = notice
  end

  def execute!
    # Sidekiqに登録されているLINEメッセージの送信ジョブを削除する
    ss = Sidekiq::ScheduledSet.new
    jobs = ss.select{ |job| @notice.line_message_jobs.map(&:job_id).include?(job.item['jid']) }
    jobs.each(&:delete)
    @notice.line_message_jobs.destroy_all
  end
end

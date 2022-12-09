class Notices::DeleteJobService
  require 'sidekiq/api'

  def initialize(notice)
    @notice = notice
  end

  def execute!
    # Sidekiqに登録されているLINEメッセージの送信ジョブを削除する
    ss = Sidekiq::ScheduledSet.new
    jobs = ss.select { |job| job.args[0]['job_id'] == @notice.job_id }
    jobs.each(&:delete)
    @notice.update!(job_id: nil)
  end
end

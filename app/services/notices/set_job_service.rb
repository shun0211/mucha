class Notices::SetJobService
  def initialize(notice)
    @notice = notice
  end

  def execute!
    if @notice.scheduled?
      job = SendLineMessageJob.set(wait_until: @notice.scheduled_at).perform_later(@notice)
      @notice.update!(job_id: job.job_id)
    end
  end
end

class DailyCheckJob
  include Sidekiq::Worker
  queue_as :low

  def perform
    %x(rake verify_line_message_job_and_scheduled_job:exec)
  end
end

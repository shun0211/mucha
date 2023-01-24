class Notices::SetJobService
  attr_reader :notice

  def initialize(notice)
    @notice = notice
  end

  # line_message_jobs レコードもここで作られる
  def execute!
    return unless @notice.scheduled?

    job_id = SendLineMessageJob
      .set(wait_until: @notice.scheduled_at)
      .perform_async(@notice.id)
    @notice.line_message_jobs.create!(
      job_id: job_id,
      scheduled_at: @notice.scheduled_at
    )
    return unless @notice.repeat

    @delivery_datetimes = []
    if @notice.monday
      add_delivery_datetimes("monday")
    elsif @notice.tuesday
      add_delivery_datetimes("tuesday")
    elsif @notice.wednesday
      add_delivery_datetimes("wednesday")
    elsif @notice.thursday
      add_delivery_datetimes("thursday")
    elsif @notice.friday
      add_delivery_datetimes("friday")
    elsif @notice.saturday
      add_delivery_datetimes("saturday")
    elsif @notice.sunday
      add_delivery_datetimes("sunday")
    end

    job_ids_with_datetime = []
    @delivery_datetimes.each do |datetime|
      job_id = SendLineMessageJob
        .set(wait_until: datetime)
        .perform_async(notice.id)
      job_ids_with_datetime.push({ job_id: job_id, scheduled_at: datetime })
    end

    job_ids_with_datetime.each do |jiwd|
      @notice.line_message_jobs.create!(
        job_id: jiwd[:job_id],
        scheduled_at: jiwd[:scheduled_at]
      )
    end
  end

  private def add_delivery_datetimes(week)
    raise StandardError "@delivery_datetimes が定義されていません" if @delivery_datetimes.nil?

    # 繰り返しは8週間先まで行う
    8.times do |i|
      @delivery_datetimes.push(@notice.scheduled_at.send("next_#{week}") + (i * 7).days)
    end
  end
end

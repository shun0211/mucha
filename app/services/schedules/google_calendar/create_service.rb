class Schedules::GoogleCalendar::CreateService
  attr_reader :user, :service

  def initialize(user, auth_client)
    @user = user
    @service = Google::Apis::CalendarV3::CalendarService.new
    @service.authorization = auth_client
  end

  def execute!
    # Google Calendar の予定を取得する
    event_list = service.list_events('primary', time_min: Time.zone.now.rfc3339, time_max: 1.month.since.in_time_zone.rfc3339 )

    # Google カレンダー上で消されたスケジュールを全て削除する
    i_cal_uids = event_list.items.map(&:i_cal_uid)
    user.schedules.where.not(uid: i_cal_uids).destroy_all

    event_list.items.each do |event|
      Schedule.transaction do
        schedule = user.schedules.find_or_initialize_by(uid: event.i_cal_uid)
        # スケジュールの詳細が変更になっているかもしれないので、再代入する
        schedule.assign_attributes(
          title: event.summary || '（タイトルなし）',
          description: event.description || '',
          start_time: event.start.date || event.start.date_time,
          end_time: event.end.date || event.end.date_time,
          all_day: event.start.date_time.nil? && event.end.date_time.nil?,
          source: 'google_calendar',
          source_url: event.html_link,
          notice_minutes_ago: 10
        )
        if schedule.changed? && schedule.save!
          notice = schedule.notice || Notice.new(schedule: schedule)
          Notices::DeleteJobService.new(notice).execute! unless notice.new_record?

          notice.assign_attributes(
            title: schedule.title,
            message: schedule.description,
            scheduled_at: schedule.start_time - schedule.notice_minutes_ago.minutes,
            to_line_id: user.line_user_id,
            talk_type: "dm",
            status: "scheduled",
            source: "google_calendar",
            repeat: false,
            user: user
          )
          notice.save!
          Notices::SetJobService.new(notice).execute!
        end
      end
    end
  end
end

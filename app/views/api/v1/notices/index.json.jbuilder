json.set! :notices do
  json.array! @notices do |notice|
    json.id notice.id
    json.title notice.title
    json.scheduledAt notice.scheduled_at
    json.sentAt notice.sent_at
    json.repeat notice.repeat
    json.monday notice.monday
    json.tuesday notice.tuesday
    json.wednesday notice.wednesday
    json.thursday notice.thursday
    json.friday notice.friday
    json.saturday notice.saturday
    json.sunday notice.sunday
    json.talkType notice.talk_type
    json.toLineId  notice.to_line_id
    json.status notice.status
    json.scheduledDate notice.scheduled_at.strftime('%Y/%m/%d')
    json.scheduledTime notice.scheduled_at.strftime('%H:%M')
    json.repeatedWeeks notice.repeated_weeks
    json.message notice.message
    json.scheduledDatetimes notice.line_message_jobs.map(&:scheduled_at)
    json.source notice.source
    if notice.schedule.present?
      json.set! :schedule do
        json.title notice.schedule.title
        json.description notice.schedule.description
        json.source_url notice.schedule.source_url
        json.source notice.schedule.source
        json.bookingDetail notice.schedule.booking_detail
      end
    end
  end
end
json.set! :page do
  json.page @notices.current_page
  json.perPage @notices.size
  json.totalCount @notices.total_count
  json.totalPages @notices.total_pages
end

# == Schema Information
#
# Table name: schedules
#
#  id                 :bigint           not null, primary key
#  all_day            :boolean          default(FALSE), not null
#  description        :text(65535)
#  end_time           :datetime         not null
#  notice_minutes_ago :integer
#  source             :integer          not null
#  source_url         :string(255)      not null
#  start_time         :datetime         not null
#  title              :string(255)      not null
#  uid                :string(255)      not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  google_calendar_id :string(255)
#  user_id            :bigint           not null
#
# Indexes
#
#  index_schedules_on_uid      (uid) UNIQUE
#  index_schedules_on_user_id  (user_id)
#
class Schedule < ApplicationRecord
  belongs_to :user
  has_one :notice, dependent: :destroy

  validates :title, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :all_day, inclusion: { in: [true, false] }
  validates :uid, presence: true
  validates :source, presence: true
  validates :source_url, presence: true

  enum source: {
    google_calendar: 10
  }

  after_save :save_or_create_notice

  def booking_detail
    start_date = self.start_time.strftime('%Y/%m/%d')
    end_date = self.end_time.strftime('%Y/%m/%d')
    start_time = self.start_time.strftime('%H:%M')
    end_time = self.end_time.strftime('%H:%M')

    if self.all_day? && self.start_time == self.end_time
      start_date
    elsif self.all_day?
      "#{start_date} ~ #{end_date}"
    else
      "#{start_date} #{start_time} ~ #{end_time}"
    end
  end

  def booking_time
    start_time = self.start_time.strftime('%H:%M')
    end_time = self.end_time.strftime('%H:%M')
    "#{start_time} ~ #{end_time}"
  end

  private def save_or_create_notice
    notice = self.notice || Notice.new(schedule: self)
    Notices::DeleteJobService.new(notice).execute! unless notice.new_record?

    # NOTE: スケジュールが終日の場合は朝7時に通知する
    #       それ以外の場合は、スケジュールの開始時間から指定した分数前に通知する
    if self.all_day?
      scheduled_at = self.start_time.beginning_of_day + 7.hours
    else
      scheduled_at = self.start_time - self.notice_minutes_ago.minutes
    end

    notice.assign_attributes(
      title: self.title,
      message: self.description || '',
      scheduled_at: scheduled_at,
      to_line_id: self.user.line_user_id,
      talk_type: "dm",
      status: "scheduled",
      source: "google_calendar",
      repeat: false,
      user: self.user
    )
    notice.save!
    Notices::SetJobService.new(notice).execute!
  end
end

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
end

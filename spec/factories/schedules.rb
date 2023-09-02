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
FactoryBot.define do
  factory :schedule do
    all_day { false }
    end_time { "2023-9-1 11:00".in_time_zone }
    notice_minutes_ago { 10}
    source { 'google_calendar' }
    source_url { 'https://example.com' }
    start_time { "2023-9-1 10:00".in_time_zone }
    title { '予定'}
    uid { SecureRandom.hex(10) }
    created_at { Time.current }
    updated_at { Time.current }
    association :user
  end

  factory :all_day_schedule, class: 'Schedule' do
    all_day { true }
    end_time { "2023-9-1".in_time_zone }
    notice_minutes_ago { 10}
    source { 'google_calendar' }
    source_url { 'https://example.com' }
    start_time { "2023-9-1".in_time_zone }
    title { '予定'}
    uid { SecureRandom.hex(10) }
    created_at { Time.current }
    updated_at { Time.current }
    association :user
  end
end

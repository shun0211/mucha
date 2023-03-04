# == Schema Information
#
# Table name: notices
#
#  id           :bigint           not null, primary key
#  friday       :boolean          default(FALSE), not null
#  message      :text(65535)      not null
#  monday       :boolean          default(FALSE), not null
#  repeat       :boolean          not null
#  saturday     :boolean          default(FALSE), not null
#  scheduled_at :datetime         not null
#  sent_at      :datetime
#  source       :integer          default("none"), not null
#  status       :integer          not null
#  sunday       :boolean          default(FALSE), not null
#  talk_type    :integer          not null
#  thursday     :boolean          default(FALSE), not null
#  title        :string(255)      not null
#  tuesday      :boolean          default(FALSE), not null
#  wednesday    :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  schedule_id  :bigint
#  to_line_id   :string(255)      not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_notices_on_schedule_id   (schedule_id)
#  index_notices_on_scheduled_at  (scheduled_at)
#  index_notices_on_user_id       (user_id)
#
FactoryBot.define do
  factory :notice do
    title { 'タイトル' }
    message { 'メッセージ' }
    repeat { false }
    scheduled_at { Time.current + 2.days }
    status { 'scheduled' }
    talk_type { 'dm' }
    to_line_id { 'line123' }
    association :user
  end

  factory :repeated_notice, class: 'Notice' do
    title { '繰り返しのリマインド' }
    message { '繰り返しのリマインド' }
    repeat { true }
    scheduled_at { Time.current + 2.days }
    status { 'scheduled' }
    talk_type { 'dm' }
    to_line_id { 'line123' }
    association :user
  end

  trait :with_line_message_job do
    after(:create) do |notice|
      create(:line_message_job, notice: notice)
    end
  end
end

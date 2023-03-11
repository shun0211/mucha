# == Schema Information
#
# Table name: monthly_message_metrics
#
#  id                  :bigint           not null, primary key
#  chatgpt_usage_count :integer          default(0), not null
#  month               :integer          not null
#  send_count          :integer          default(0), not null
#  year                :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :bigint           not null
#
# Indexes
#
#  index_monthly_message_metrics_on_user_id  (user_id)
#
FactoryBot.define do
  factory :monthly_message_metric do
    year { Time.current.year }
    month { Time.current.month }
    send_count { 0 }
    association :user
  end
end

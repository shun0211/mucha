# == Schema Information
#
# Table name: line_message_jobs
#
#  id           :bigint           not null, primary key
#  scheduled_at :datetime         not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  job_id       :string(255)      not null
#  notice_id    :bigint           not null
#
# Indexes
#
#  index_line_message_jobs_on_notice_id  (notice_id)
#
FactoryBot.define do
  factory :line_message_job do
    job_id { SecureRandom.hex(24) }
    association :notice
  end
end

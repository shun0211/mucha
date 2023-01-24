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
class LineMessageJob < ApplicationRecord
  belongs_to :notice

  validates :job_id, presence: true
  validates :scheduled_at, presence: true
end

# == Schema Information
#
# Table name: monthly_message_metrics
#
#  id         :bigint           not null, primary key
#  month      :integer          not null
#  send_count :integer          default(0), not null
#  year       :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_monthly_message_metrics_on_user_id  (user_id)
#
class MonthlyMessageMetric < ApplicationRecord
  belongs_to :user

  validates :year, presence: true
  validates :month, presence: true
  validates :send_count, presence: true

  before_create :set_send_count

  private def set_send_count
    self.send_count = 0
  end
end
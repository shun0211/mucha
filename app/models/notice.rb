# == Schema Information
#
# Table name: notices
#
#  id         :bigint           not null, primary key
#  message    :text(65535)      not null
#  monday     :boolean          default(FALSE), not null
#  repeat     :boolean          not null
#  saturday   :boolean          default(FALSE), not null
#  sent_at    :datetime
#  status     :integer          not null
#  sunday     :boolean          default(FALSE), not null
#  talk_type  :integer          not null
#  thursday   :boolean          default(FALSE), not null
#  title      :string(255)      not null
#  tuesday    :boolean          default(FALSE), not null
#  wednesday  :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  to_line_id :string(255)      not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_notices_on_user_id  (user_id)
#
class Notice < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :message, presence: true
  validates :repeat, inclusion: { in: [true, false] }
  validates :monday, :tuesday, :wednesday, :tuesday, :friday, :saturday, :sunday, inclusion: { in: [true, false] }
  validates :to_line_id, presence: true

  enum talk_type: {
    dm: 10,
    group: 20
  }

  enum status: {
    scheduled: 10,
    draft: 20,
    sent: 30
  }
end

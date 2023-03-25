# == Schema Information
#
# Table name: chatgpt_messages
#
#  id         :bigint           not null, primary key
#  message    :text(65535)      not null
#  role       :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_chatgpt_messages_on_user_id  (user_id)
#
class ChatgptMessage < ApplicationRecord
  belongs_to :user

  validates :message, presence: true
  validates :role, presence: true

  enum role: {
    user: 10,
    assistant: 20
  }
end

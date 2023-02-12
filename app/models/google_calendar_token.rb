# == Schema Information
#
# Table name: google_calendar_tokens
#
#  id                 :bigint           not null, primary key
#  refresh_token      :string(255)      not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  google_calendar_id :string(255)      not null
#  user_id            :bigint           not null
#
# Indexes
#
#  index_google_calendar_tokens_on_user_id  (user_id)
#
class GoogleCalendarToken < ApplicationRecord
  belongs_to :user

  validates :google_calendar_id, presence: true
  validates :refresh_token, presence: true
end

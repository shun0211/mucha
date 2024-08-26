# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  is_friend              :boolean          default(FALSE), not null
#  line_name              :string(255)
#  line_nonce             :string(255)
#  line_profile_image_url :string(255)
#  plan                   :integer          default(0), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  firebase_user_id       :string(255)      not null
#  line_user_id           :string(255)
#
# Indexes
#
#  index_users_on_firebase_user_id  (firebase_user_id) UNIQUE
#  index_users_on_line_user_id      (line_user_id) UNIQUE
#
class User < ApplicationRecord
  has_many :notices, dependent: :destroy
  has_many :group_talk_rooms, dependent: :destroy
  has_many :google_calendar_tokens, dependent: :destroy
  has_many :schedules, dependent: :destroy
  has_one :user_setting, dependent: :destroy
  has_many :monthly_message_metrics, dependent: :destroy
  has_many :chatgpt_messages, dependent: :destroy
  has_many :shopping_lists, dependent: :destroy

  validates :firebase_user_id, presence: true

  after_create :create_user_setting

  def google_calendar_sync_enabled?
    google_calendar_token.present?
  end

  private def create_user_setting
    UserSetting.create!(user_id: self.id)
  end
end

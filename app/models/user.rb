# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  line_name              :string(255)
#  line_nonce             :string(255)
#  line_profile_image_url :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  auth0_user_id          :string(255)      not null
#  line_user_id           :string(255)
#
class User < ApplicationRecord
  has_many :notices, dependent: :destroy
  has_many :group_talk_rooms, dependent: :destroy

  validates :auth0_user_id, presence: true
end

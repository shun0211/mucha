# == Schema Information
#
# Table name: group_talk_rooms
#
#  id                     :bigint           not null, primary key
#  line_name              :string(255)      not null
#  line_profile_image_url :string(255)      not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  line_group_id          :string(255)      not null
#  user_id                :bigint           not null
#
# Indexes
#
#  index_group_talk_rooms_on_user_id  (user_id)
#
class GroupTalkRoom < ApplicationRecord
  belongs_to :user

  validates :line_name, presence: true
  validates :line_profile_image_url, presence: true
  validates :line_group_id, presence: true
end

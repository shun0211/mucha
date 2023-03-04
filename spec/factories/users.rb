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
FactoryBot.define do
  factory :user do
    firebase_user_id { SecureRandom.hex(33) }
    line_user_id { SecureRandom.hex(33) }
    line_name { 'ユーザ名' }
  end
end

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
require "rails_helper"

RSpec.describe UserSetting, type: :model do
  describe 'Callback' do
    context 'ユーザーが新規作成されたとき' do
      it 'UserSetting レコードを作成すること' do
        expect {
          create(:user)
        }.to change(UserSetting, :count).by(+1)
      end

      it 'send_line_daily_schedule フラグが false になること' do
        user = create(:user)
        user_setting = UserSetting.last
        expect(user.user_setting.send_line_daily_schedule).to eq false
      end
    end
  end
end

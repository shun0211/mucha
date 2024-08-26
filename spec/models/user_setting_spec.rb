# == Schema Information
#
# Table name: user_settings
#
#  id                       :bigint           not null, primary key
#  chat_role                :integer          default("create_notice"), not null
#  send_line_daily_schedule :boolean          default(FALSE), not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  user_id                  :bigint           not null
#
# Indexes
#
#  index_user_settings_on_user_id  (user_id)
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

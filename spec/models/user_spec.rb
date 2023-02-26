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

# == Schema Information
#
# Table name: schedules
#
#  id                 :bigint           not null, primary key
#  all_day            :boolean          default(FALSE), not null
#  description        :text(65535)
#  end_time           :datetime         not null
#  notice_minutes_ago :integer
#  source             :integer          not null
#  source_url         :string(255)      not null
#  start_time         :datetime         not null
#  title              :string(255)      not null
#  uid                :string(255)      not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  user_id            :bigint           not null
#
# Indexes
#
#  index_schedules_on_uid      (uid) UNIQUE
#  index_schedules_on_user_id  (user_id)
#
require "rails_helper"

RSpec.describe Schedule, type: :model do
  let(:schedule) { create(:schedule) }
  let(:all_day_schedule) { create(:all_day_schedule) }

  describe '#booking_detail' do
    context '終日の予定の場合' do
      it '日付のみを返すこと' do
        expect(all_day_schedule.booking_detail).to eq("2023/09/01")
      end
    end

    context '終日の予定ではない場合' do
      it '日付と開始時間と終了時間を返すこと' do
        expect(schedule.booking_detail).to eq("2023/09/01 10:00 ~ 11:00")
      end
    end

    context '複数の日にまたがる予定の場合' do
      before do
        all_day_schedule.update!(end_time: "2023-9-3".in_time_zone)
      end

      it '開始日付と終了日付を返すこと' do
        expect(all_day_schedule.booking_detail).to eq("2023/09/01 ~ 2023/09/03")
      end
    end
  end
end

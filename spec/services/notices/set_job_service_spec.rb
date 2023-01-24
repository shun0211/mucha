# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notices::SetJobService, type: :service do
  let(:non_repeated_notice) { create(:notice) }
  let(:repeated_notice) { create(:repeated_notice, monday: true) }

  describe "execute!" do
    context "繰り返しがオフの場合" do
      it 'line_message_jobs レコードが作成され、キューがセットされること' do
        Sidekiq::Testing.fake! do
          expect {
            Notices::SetJobService.new(non_repeated_notice).execute!
          }.to change(LineMessageJob, :count).by(+1)
           .and change(SendLineMessageJob.jobs, :count).by(+1)
        end
      end
    end

    context '繰り返しがオンの場合' do
      it '2ヶ月先までの指定された曜日の日時の line_message_jobs レコードが作成されること' do
        Sidekiq::Testing.fake! do
          expect {
            Notices::SetJobService.new(repeated_notice).execute!
          }.to change(LineMessageJob, :count).by(+9)
           .and change(SendLineMessageJob.jobs, :count).by(+9)
        end
      end
    end
  end
end

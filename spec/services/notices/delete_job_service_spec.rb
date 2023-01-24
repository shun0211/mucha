# frozen_string_literal: true

# Sidekiq::ScheduledSet.new で開発環境で登録されたジョブの情報が入ってしまうためテスト Pending
require 'rails_helper'
require 'sidekiq/testing'

RSpec.describe Notices::DeleteJobService, type: :service, skip: true do
  let(:notice) { create(:notice) }

  before { Sidekiq::Worker.clear_all }

  describe "execute!" do
    before do
      job_id = SendLineMessageJob.perform_async(notice.id)
      notice.line_message_jobs.create!(job_id: job_id)
    end

    context "繰り返しがオフの場合" do
      it 'line_message_jobs レコードが削除されること' do
        Sidekiq::Testing.fake! do
          expect {
            Notices::DeleteJobService.new(notice).execute!
          }.to change(LineMessageJob, :count).by(-1)
           .and change(SendLineMessageJob.jobs, :count).by(-1)
        end
      end
    end

    context '繰り返しがオンの場合' do
      it '紐づく line_message_jobs レコードすべてが削除されること' do
        Sidekiq::Testing.fake! do
          expect {
            Notices::DeleteJobService.new(notice).execute!
          }.to change(LineMessageJob, :count).by(-1)
           .and change(SendLineMessageJob.jobs, :count).by(-1)
        end
      end
    end
  end
end

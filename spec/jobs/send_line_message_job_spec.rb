# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SendLineMessageJob, type: :job do
  describe '#perform' do
    before do
      @notice = create(:notice)
      @line_message_job = create(:line_message_job, notice: @notice)
      @job = described_class.new
      allow(@job).to receive(:jid).and_return(@line_message_job.job_id)
      allow(Line::Bot::Client).to receive(:new).and_return(line_bot_client)
      allow(line_bot_client).to receive(:push_message)
    end

    let(:notice) { @notice }
    let(:line_message_job) { @line_message_job }
    let(:job) { @job }
    let(:line_bot_client) { instance_double(Line::Bot::Client) }
    let(:message) do
      {
        type: 'text',
        text: <<~MESSAGE.gsub(/^\s+/, '').chomp
          [#{notice.title}]
          #{notice.message}
          　
          リマインドのお知らせです😊
        MESSAGE
      }
    end

    it 'sends a message to the user' do
      expect(line_bot_client).to receive(:push_message).with(notice.to_line_id, message)
      job.perform(notice.id)
    end

    context '今月の monthly_message_metrics レコードが作成されていない場合' do
      it '正しく作成されること' do
        expect {
          job.perform(notice.id)
        }.to change(MonthlyMessageMetric, :count).by(1)
        monthly_message_metrics = notice.user.monthly_message_metrics.last
        expect(monthly_message_metrics.year).to eq Time.current.year
        expect(monthly_message_metrics.month).to eq Time.current.month
        expect(monthly_message_metrics.send_count).to eq 1
      end
    end

    context '今月の monthly_message_metrics レコードが作成されている場合' do
      before do
        @monthly_message_metric = create(:monthly_message_metric, user: notice.user, year: Time.current.year, month: Time.current.month)
      end

      it 'send_count が 1 増えること' do
        expect {
          job.perform(notice.id)
        }.to change { @monthly_message_metric.reload.send_count }.by(1)
      end
    end
  end
end

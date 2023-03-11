class AddChatgptUsageCountToMonthlyMessageMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :monthly_message_metrics, :chatgpt_usage_count, :integer, default: 0, null: false
  end
end

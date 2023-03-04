class CreateMonthlyMessageMetrics < ActiveRecord::Migration[7.0]
  def change
    create_table :monthly_message_metrics do |t|
      t.references :user, null: false
      t.integer :year, null: false
      t.integer :month, null: false
      t.integer :send_count, null: false, default: 0
      t.timestamps
    end
  end
end

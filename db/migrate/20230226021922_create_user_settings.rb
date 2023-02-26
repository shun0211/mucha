class CreateUserSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :user_settings do |t|
      t.boolean :send_line_daily_schedule, null: false, default: false
      t.references :user, null: false
      t.timestamps
    end
  end
end

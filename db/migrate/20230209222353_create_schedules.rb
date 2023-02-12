class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.string :title, null: false
      t.text :description
      t.string :uid, null: false
      t.references :user, null: false
      t.integer :source, null: false
      t.boolean :all_day, null: false, default: false
      t.string :source_url, null: false
      t.integer :notice_minutes_ago
      t.timestamps
    end

    add_index :schedules, :uid, unique: true
  end
end

class AddScheduleIdToNotice < ActiveRecord::Migration[7.0]
  def change
    add_reference :notices, :schedule, foreign_key: true
    add_column :notices, :source, :integer, null: false, default: 0
  end
end

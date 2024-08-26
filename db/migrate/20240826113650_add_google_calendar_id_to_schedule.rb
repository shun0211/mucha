class AddGoogleCalendarIdToSchedule < ActiveRecord::Migration[7.0]
  def change
    add_column :schedules, :google_calendar_id, :string
  end
end

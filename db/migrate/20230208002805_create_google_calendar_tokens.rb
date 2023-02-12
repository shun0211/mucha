class CreateGoogleCalendarTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :google_calendar_tokens do |t|
      t.references :user, null: false
      t.string :google_calendar_id, null: false
      t.string :refresh_token, null: false
      t.timestamps
    end
  end
end

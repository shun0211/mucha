class CreateGroupTalkRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :group_talk_rooms do |t|
      t.references :user, null: false
      t.string :line_name, null: false
      t.string :line_profile_image_url, null: false
      t.string :line_group_id, null: false
      t.timestamps
    end
  end
end

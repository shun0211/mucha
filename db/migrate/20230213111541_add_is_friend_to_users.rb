class AddIsFriendToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :is_friend, :boolean, null: false, default: false
  end
end

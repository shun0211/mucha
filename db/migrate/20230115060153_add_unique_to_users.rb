class AddUniqueToUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :firebase_user_id, unique: true
    add_index :users, :line_user_id, unique: true
  end
end

class AddFirebaseUserIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :firebase_user_id, :string, null: false
    change_column_null :users, :auth0_user_id, true
  end
end

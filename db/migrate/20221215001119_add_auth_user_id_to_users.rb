class AddAuthUserIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :auth0_user_id, :string, null: false
    remove_column :users, :email, :string
  end
end

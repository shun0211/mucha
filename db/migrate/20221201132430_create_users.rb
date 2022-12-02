class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :line_user_id
      t.string :line_nonce
      t.timestamps
    end
  end
end

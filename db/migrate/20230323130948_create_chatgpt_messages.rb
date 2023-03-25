class CreateChatgptMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :chatgpt_messages do |t|
      t.references :user, null: false
      t.text :message, null: false
      t.integer :role, null: false
      t.timestamps
    end
  end
end

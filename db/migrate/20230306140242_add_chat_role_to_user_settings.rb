class AddChatRoleToUserSettings < ActiveRecord::Migration[7.0]
  def change
    add_column :user_settings, :chat_role, :integer, null: false, default: 10
  end
end

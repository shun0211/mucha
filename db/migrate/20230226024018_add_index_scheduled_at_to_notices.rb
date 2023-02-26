class AddIndexScheduledAtToNotices < ActiveRecord::Migration[7.0]
  def change
    add_index :notices, :scheduled_at
  end
end

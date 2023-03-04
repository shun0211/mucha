class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :plan, :integer, null: false, default: 0
  end
end

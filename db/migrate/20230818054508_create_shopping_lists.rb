class CreateShoppingLists < ActiveRecord::Migration[7.0]
  def change
    create_table :shopping_lists do |t|
      t.references :user, null: false
      t.string :name, null: false
      t.boolean :is_done, null: false, default: false
      t.datetime :done_at
      t.integer :disp_order, null: false
      t.timestamps
    end
  end
end

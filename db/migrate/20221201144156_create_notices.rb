class CreateNotices < ActiveRecord::Migration[7.0]
  def change
    create_table :notices do |t|
      t.references :user, null: false
      t.string :title, null: false
      t.text :message, null: false
      t.integer :status, null: false
      t.datetime :sent_at
      t.datetime :scheduled_at, null: false
      t.boolean :repeat, null: false
      t.boolean :monday, null: false, default: false
      t.boolean :tuesday, null: false, default: false
      t.boolean :wednesday, null: false, default: false
      t.boolean :thursday, null: false, default: false
      t.boolean :friday, null: false, default: false
      t.boolean :saturday, null: false, default: false
      t.boolean :sunday, null: false, default: false
      t.string :to_line_id, null: false
      t.integer :talk_type, null: false
      t.timestamps
    end
  end
end

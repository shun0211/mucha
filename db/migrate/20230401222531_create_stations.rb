class CreateStations < ActiveRecord::Migration[7.0]
  def change
    create_table :stations do |t|
      t.string :name, null: false
      t.string :name_kana, null: false
      t.string :code, null: false
      t.string :prefecture, null: false
      t.string :prefecture_code, null: false
      t.decimal :lat, precision: 8, scale: 6, null: false
      t.decimal :lng, precision: 9, scale: 6, null: false
      t.timestamps
    end
    
    add_index :stations, :name
    add_index :stations, :code, unique: true
    add_index :stations, :prefecture
    add_index :stations, :prefecture_code
  end
end

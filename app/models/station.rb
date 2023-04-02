# == Schema Information
#
# Table name: stations
#
#  id              :bigint           not null, primary key
#  code            :string(255)      not null
#  lat             :decimal(8, 6)    not null
#  lng             :decimal(9, 6)    not null
#  name            :string(255)      not null
#  name_kana       :string(255)      not null
#  prefecture      :string(255)      not null
#  prefecture_code :string(255)      not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_stations_on_code             (code) UNIQUE
#  index_stations_on_name             (name)
#  index_stations_on_prefecture       (prefecture)
#  index_stations_on_prefecture_code  (prefecture_code)
#
class Station < ApplicationRecord
  validates :code, presence: true, uniqueness: true
  validates :lat, presence: true
  validates :lng, presence: true
  validates :name, presence: true
  validates :name_kana, presence: true
  validates :prefecture, presence: true
  validates :prefecture_code, presence: true

  def self.search_by_name(name)
    Station.where('name LIKE ?', "%#{name}%")
  end

  def self.search_by_name_kana(name_kana)
    Station.where('name_kana LIKE ?', "%#{name_kana}%")
  end

  def self.search_by_prefecture(prefecture)
    Station.where(prefecture: prefecture)
  end

  def self.search_by_prefecture_code(prefecture_code)
    Station.where(prefecture_code: prefecture_code)
  end
end

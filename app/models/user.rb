# == Schema Information
#
# Table name: users
#
#  id           :bigint           not null, primary key
#  email        :string(255)      not null
#  line_nonce   :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  line_user_id :string(255)
#
class User < ApplicationRecord
  has_many :notices, dependent: :destroy

  validates :email, presence: true
end

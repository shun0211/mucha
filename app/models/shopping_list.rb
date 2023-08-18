# == Schema Information
#
# Table name: shopping_lists
#
#  id         :bigint           not null, primary key
#  disp_order :integer          not null
#  done_at    :datetime
#  is_done    :boolean          default(FALSE), not null
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_shopping_lists_on_user_id  (user_id)
#
class ShoppingList < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :is_done, inclusion: { in: [true, false] }
end

# == Schema Information
#
# Table name: notices
#
#  id         :bigint           not null, primary key
#  message    :text(65535)      not null
#  monday     :boolean          default(FALSE), not null
#  repeat     :boolean          not null
#  saturday   :boolean          default(FALSE), not null
#  sent_at    :datetime
#  status     :integer          not null
#  sunday     :boolean          default(FALSE), not null
#  talk_type  :integer          not null
#  thursday   :boolean          default(FALSE), not null
#  title      :string(255)      not null
#  tuesday    :boolean          default(FALSE), not null
#  wednesday  :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  to_line_id :string(255)      not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_notices_on_user_id  (user_id)
#
require 'rails_helper'

RSpec.describe Notice, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

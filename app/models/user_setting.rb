# == Schema Information
#
# Table name: user_settings
#
#  id                       :bigint           not null, primary key
#  send_line_daily_schedule :boolean          default(FALSE), not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  user_id                  :bigint           not null
#
# Indexes
#
#  index_user_settings_on_user_id  (user_id)
#
class UserSetting < ApplicationRecord
  belongs_to :user
end

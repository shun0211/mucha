# == Schema Information
#
# Table name: notices
#
#  id           :bigint           not null, primary key
#  friday       :boolean          default(FALSE), not null
#  message      :text(65535)      not null
#  monday       :boolean          default(FALSE), not null
#  repeat       :boolean          not null
#  saturday     :boolean          default(FALSE), not null
#  scheduled_at :datetime         not null
#  sent_at      :datetime
#  status       :integer          not null
#  sunday       :boolean          default(FALSE), not null
#  talk_type    :integer          not null
#  thursday     :boolean          default(FALSE), not null
#  title        :string(255)      not null
#  tuesday      :boolean          default(FALSE), not null
#  wednesday    :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  to_line_id   :string(255)      not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_notices_on_user_id  (user_id)
#
class Notice < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :scheduled_at, presence: true # 未来の日付しか登録できないようにしたい
  validates :repeat, inclusion: { in: [true, false] }
  validates :monday, :tuesday, :wednesday, :tuesday, :friday, :saturday, :sunday, inclusion: { in: [true, false] }
  validates :to_line_id, presence: true

  enum talk_type: {
    dm: 10,
    group_talk: 20
  }

  enum status: {
    scheduled: 10,
    draft: 20,
    sent: 30
  }

  # デコレーターに切り出す
  def repeated_weeks
    # すべてがfalseの場合、「なし」
    # true のものだけ羅列
    return 'なし' if (!sunday && !tuesday && !wednesday && !thursday && !friday && !saturday && !sunday)

    repeated_weeks_arr = []
    if monday
      repeated_weeks_arr.push('月')
    elsif tuesday
      repeated_weeks_arr.push('火')
    elsif wednesday
      repeated_weeks_arr.push('水')
    elsif thursday
      repeated_weeks_arr.push('木')
    elsif friday
      repeated_weeks_arr.push('金')
    elsif saturday
      repeated_weeks_arr.push('土')
    elsif sunday
      repeated_weeks_arr.push('日')
    end

    repeated_weeks_arr.join('、')
  end
end

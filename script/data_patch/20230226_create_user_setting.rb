# USAGE:
# bundle exec rails runner 'load "script/data_patch/20230226_create_user_setting.rb"; DataPatch::CreateUserSetting.new.execute!'

module DataPatch
  class CreateUserSetting
    def initialize
      @logger = Logger.new("#{Rails.root}/log/create_user_setting.log")
    end

    def execute!
      # SELECT *
      # FROM User
      # WHERE id NOT IN (
      #   SELECT user_id
      #   FROM UserSetting
      # );
      target_users = User.where.not(id: UserSetting.pluck(:user_id))

      puts '【実行前】'
      # 件数
      puts "対象となるユーザー数: #{target_users.count}"
      puts "対象となるユーザーのID: #{target_users.ids}"

      puts "処理を開始します ... [y/n]"
      exit if STDIN.gets.strip != 'y'
      puts '****************************************************************************************************'
      puts '【処理開始】'
      @logger.info('Start')

      target_users.each do |user|
        UserSetting.create!(user_id: user.id)
      end

      puts '【実行後】'
      users_without_user_setting = User.where.not(id: UserSetting.pluck(:user_id))
      puts "UserSetting を持たないユーザー数: #{users_without_user_setting.count}"

      puts '【処理完了】'
      puts '****************************************************************************************************'
      @logger.info('End')
    end
  end
end

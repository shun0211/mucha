# frozen_string_literal: true

class LineBot::CallbacksController < ApplicationController
  def callback # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    type = params['events'].first['type']
    result = params['events'].first.dig('link', 'result')
    line_nonce = params['events'].first.dig('link', 'nonce')
    line_user_id = params['events'].first['source']['userId']

    return if %w[unfollow leave].include?(type)

    if type == 'accountLink' && result == 'ok'
      user = User.find_by(line_nonce:)
      user.line_user_id = line_user_id
      user.save!
      return
    end

    # 後で message は削除する
    # アカウント連携のメッセージを送信するのは友だち登録をしたときのみ
    return unless %w[follow message].include?(type)

    response = line_bot_client.create_link_token(line_user_id)
    link_token = JSON.parse(response.body)['linkToken']
    message = [{
      "type": 'template',
      "altText": '今すぐアカウント連携する🚀',
      "template": {
        "type": 'buttons',
        "text": "Muchaとアカウント連携をすると、LINEに通知することができるようになります😳\n\n※アカウント連携は後で解除できます",
        "actions": [{
          "type": 'uri',
          "label": '今すぐアカウント連携する',
          "uri": "#{ENV['FRONT_URI']}/line-account-linkage?linkToken=#{link_token}"
        }]
      }
    }]
    line_bot_client.push_message(line_user_id, message)
  end

  def link
    nonce = SecureRandom.uuid
    current_user.line_nonce = nonce
    current_user.save!

    link_token = params[:linkToken]
    redirect_to(
      "https://access.line.me/dialog/bot/accountLink?linkToken=#{link_token}&nonce=#{nonce}",
      allow_other_host: true
    )
  end

  private def line_bot_client
    @line_bot_client ||= Line::Bot::Client.new do |config|
      config.channel_id = ENV['LINE_CHANNEL_ID']
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
    end
  end
end

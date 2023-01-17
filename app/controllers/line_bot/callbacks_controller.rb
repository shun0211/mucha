# frozen_string_literal: true

class LineBot::CallbacksController < ApplicationController
  def callback # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    type = params['events'].first['type']
    result = params['events'].first.dig('link', 'result')
    line_nonce = params['events'].first.dig('link', 'nonce')
    line_user_id = params['events'].first['source']['userId']

    return if %w[unfollow leave memberLeft].include?(type)

    if type == 'accountLink' && result == 'ok'
      res = line_bot_client.get_profile(line_user_id)
      line_user_info = JSON.parse(res.body)
      user = User.find_by(line_nonce:)
      user.update!(
        line_user_id: line_user_id,
        line_name: line_user_info["displayName"],
        line_profile_image_url: line_user_info["pictureUrl"]
      )
      return
    end

    if type == 'join'
      line_group_id = params['events'].first['source']['groupId']
      message = [{
        "type": 'template',
        "altText": '今すぐアカウント連携する🚀',
        "template": {
          "type": 'buttons',
          "text": "Muchaからメッセージを受け取るために「今すぐ認証する」をクリックしてください👋",
          "actions": [{
            "type": 'uri',
            "label": '今すぐ認証する',
            "uri": "#{ENV['FRONT_URI']}/line-account-linkage?linkToken=aaa&talkType=groupTalk&lineGroupId=#{line_group_id}"
          }]
        }
      }]
      res = line_bot_client.push_message(line_group_id, message)
      return
    end

    # LINE ログインのみにしたため、アカウント連携のメッセージを送信しない
    # アカウント連携のメッセージを送信するのは友だち登録をしたときのみ
    # if type == 'follow' || type == 'message'
    #   response = line_bot_client.create_link_token(line_user_id)
    #   link_token = JSON.parse(response.body)['linkToken']
    #   message = [{
    #     "type": 'template',
    #     "altText": '今すぐアカウント連携する🚀',
    #     "template": {
    #       "type": 'buttons',
    #       "text": "下ボタンからアカウント連携していただけますと、Mucha の機能を使えるようになります😊\n\n※アカウント連携は後で解除できます",
    #       "actions": [{
    #         "type": 'uri',
    #         "label": '今すぐアカウント連携する',
    #         "uri": "#{ENV['FRONT_URI']}/line-account-linkage?talkType=dm&linkToken=#{link_token}"
    #       }]
    #     }
    #   }]
    #   line_bot_client.push_message(line_user_id, message)
    # end
  end

  private def line_bot_client
    @line_bot_client ||= Line::Bot::Client.new do |config|
      config.channel_id = ENV['LINE_CHANNEL_ID']
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
    end
  end
end

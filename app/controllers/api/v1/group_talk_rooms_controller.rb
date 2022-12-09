class Api::V1::GroupTalkRoomsController < ApplicationController
  def index
    @group_talk_rooms = current_user.group_talk_rooms
  end

  def create
    res = line_bot_client.get_group_summary(params[:line_group_id])
    line_group_info = JSON.parse(res.body)
    group_talk_room = GroupTalkRoom.new(
      line_group_id: line_group_info["groupId"],
      line_name: line_group_info["groupName"],
      line_profile_image_url: line_group_info["pictureUrl"]
    )
    group_talk_room.user = current_user
    group_talk_room.save!
  end

  private def line_bot_client
    @line_bot_client ||= Line::Bot::Client.new do |config|
      config.channel_id = ENV['LINE_CHANNEL_ID']
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
    end
  end
end

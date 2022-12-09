json.set! :groupTalkRooms do
  json.array! @group_talk_rooms do |room|
    json.id room.id
    json.lineName room.line_name
    json.lineProfileImageUrl room.line_profile_image_url
    json.lineGroupId room.line_group_id
  end
end

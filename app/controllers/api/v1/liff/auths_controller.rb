class Api::V1::Liff::AuthsController < ApplicationController
  def fetch_custom_token
    res = line_conn.get('/v2/profile', {}, {Authorization: "Bearer #{liff_access_token}"})
    line_user_info = JSON.parse(res.body)
    current_user = User
      .where(firebase_user_id: line_user_info['userId'])
      .or(User.where(line_user_id: line_user_info['userId']))
      .first

    if current_user.nil?
      User.transaction do
        current_user = User.create!(
          firebase_user_id: line_user_info['userId'],
          line_user_id: line_user_info['userId'],
          line_name: line_user_info["displayName"],
          line_profile_image_url: line_user_info["pictureUrl"]
        )
        app.auth.create_user(uid: line_user_info['userId'])
      end
    end

    custom_token = create_custom_token(current_user.line_user_id)
    render json: { customToken: custom_token }, status: :ok
  end

  def liff_access_token
    if request.headers['Authorization'].present?
      request.headers['Authorization'].split(' ').last
    end
  end
end

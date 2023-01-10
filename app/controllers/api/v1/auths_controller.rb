class Api::V1::AuthsController < ApplicationController
  def fetch_custom_token
    code = params[:code]
    return render_bad_request_error("", "Request does not contain code!") if code.nil?

    res = line_conn.post('/oauth2/v2.1/token') do |req|
      req.body = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: ENV['LINE_LOGIN_REDIRECT_URL'],
        client_id: ENV['LINE_LOGIN_CHANNEL_ID'],
        client_secret: ENV['LINE_LOGIN_CHANNEL_SECRET']
      }
    end
    return render_bad_request_error("有効期限が切れています😱 再度お試しください。", res.body) if res.status != 200

    tokens = JSON.parse(res.body)
    access_token = tokens["access_token"]
    id_token = tokens["id_token"]

    res = line_conn.post('/oauth2/v2.1/verify') do |req|
      req.body = {
        id_token: id_token,
        client_id: ENV['LINE_LOGIN_CHANNEL_ID']
      }
    end

    line_user_info = JSON.parse(res.body)
    current_user = User.find_by(firebase_user_id: line_user_info['sub'])

    if current_user.nil?
      User.transaction do
        current_user = User.create!(
          firebase_user_id: line_user_info['sub'],
          line_user_id: line_user_info['sub'],
          line_name: line_user_info["name"],
          line_profile_image_url: line_user_info["picture"]
        )
        app.auth.create_user(uid: line_user_info['sub'])
      end
    end

    custom_token = create_custom_token(current_user.line_user_id)
    render json: { customToken: custom_token }, status: :ok
  end

  private def firebase_function_conn
    Faraday.new(
      url: ENV['FIREBASE_FUNCTIONS_URL'],
      headers: {'Content-Type' => 'application/json'}
    )
  end

  private def create_custom_token(uid)
    now_seconds = Time.now.to_i
    private_key = OpenSSL::PKey::RSA.new(ENV['FIREBASE_PRIVATE_KEY'].gsub("\\n", "\n"))
    payload = {:iss => ENV['FIREBASE_SERVICE_ACCOUNT_EMAIL'],
               :sub => ENV['FIREBASE_SERVICE_ACCOUNT_EMAIL'],
               :aud => "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
               :iat => now_seconds,
               :exp => now_seconds + 60,
               :uid => uid}
    JWT.encode payload, private_key, "RS256"
  end
end

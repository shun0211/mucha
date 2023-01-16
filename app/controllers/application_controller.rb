class ApplicationController < ActionController::API
  def render_bad_request_error(message, for_developer_message)
    render json: {
      message:,
      forDeveloperMessage: for_developer_message
    }, status: :bad_request
  end

  def render_unauthorized_error(message, for_developer_message)
    render json: {
      message:,
      forDeveloperMessage: for_developer_message
    }, status: :unauthorized
  end

  def render_not_acceptable_error(messages, for_developer_message)
    render json: {
      messages:,
      forDeveloperMessage: for_developer_message
    }, status: :not_acceptable
  end

  # TODO: app → firebase_app にする
  def app
    file_name = Rails.env.production? ? 'prod-adminsdk.json' : 'dev-adminsdk.json'
    creds = Firebase::Admin::Credentials.from_file(Rails.root.join("config/firebase/#{file_name}"))
    Firebase::Admin::App.new(credentials: creds)
  end

  def line_conn
    Faraday.new(
      url: 'https://api.line.me',
      headers: {'Content-Type' => 'application/x-www-form-urlencoded'}
    )
  end

  def create_custom_token(uid)
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

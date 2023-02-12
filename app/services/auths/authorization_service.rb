class Auths::AuthorizationService
  def initialize(id_token)
    @id_token = id_token
    @jwt = nil
  end

  def authenticate_request!
    @jwt = app.auth.verify_id_token(@id_token)
  end

  def user
    User.find_or_create_by(firebase_user_id: @jwt["user_id"])
  end

  private

  def app
    file_name = Rails.env.production? ? 'prod-adminsdk.json' : 'dev-adminsdk.json'
    creds = Firebase::Admin::Credentials.from_file(Rails.root.join("config/firebase/#{file_name}"))
    Firebase::Admin::App.new(credentials: creds)
  end
end

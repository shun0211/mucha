class ApplicationController < ActionController::API
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

  def app
    file_name = Rails.env.production? ? 'prod-adminsdk.json' : 'dev-adminsdk.json'
    creds = Firebase::Admin::Credentials.from_file(Rails.root.join("config/firebase/#{file_name}"))
    Firebase::Admin::App.new(credentials: creds)
  end
end

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

  def current_user
    @current_user ||= User.find(1)
  end
end

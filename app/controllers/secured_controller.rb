class SecuredController < ApplicationController
  before_action :authorize_request

  def current_user
    @current_user
  end

  private

  def authorize_request
    service = Auths::AuthorizationService.new(request.headers)
    service.authenticate_request!
    @current_user = service.user

  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end
end

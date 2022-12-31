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

  rescue Firebase::Admin::Auth::InvalidTokenError,
         Firebase::Admin::Auth::ExpiredTokenError,
         Firebase::Admin::Auth::CertificateRequestError,
         Firebase::Admin::Auth::InvalidCertificateError => e
    render_unauthorized_error('不正なIDトークンです👎', e)
  end
end

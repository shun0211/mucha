class Auths::AuthorizationService
  def initialize(headers = {})
    @headers = headers
    @jwt = nil
  end

  def authenticate_request!
    @jwt = verify_token
  end

  def user
    User.find_or_create_by(auth0_user_id: @jwt.first["sub"])
  end

  private

  def http_token
    if @headers['Authorization'].present?
      @headers['Authorization'].split(' ').last
    end
  end

  def verify_token
    JsonWebToken.verify(http_token)
  end
end

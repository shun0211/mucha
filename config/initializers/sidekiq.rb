require 'sidekiq/web'

Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

# Basic 認証
Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
  [user, password] == [ENV['SIDEKIQ_WEB_BASIC_AUTHENTICATION_USER'], ENV['SIDEKIQ_WEB_BASIC_AUTHENTICATION_PASSWORD']]
end

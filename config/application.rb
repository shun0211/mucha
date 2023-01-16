require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
# require "action_cable/engine"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Mucha
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true
    config.i18n.default_locale = :ja
    config.time_zone = 'Tokyo'
    # Rubyプロセス(JST)と同じにする
    config.active_record.default_timezone = :local

    # Use Middleware
    config.middleware.use ActionDispatch::Cookies

    # Use Session
    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use config.session_store, config.session_options

    # Sidekiq
    config.active_job.queue_adapter = :sidekiq

    config.generators do |g|
      g.test_framework :rspec,
      view_specs: false,
      helper_specs: false,
      routing_specs: false
    end

    config.x.cors_allowed_origins = "#{ENV.fetch('FRONT_URI', 'http://localhost:3100')}, /\Ahttps:\/\/.*vercel\.app\z/"
  end
end

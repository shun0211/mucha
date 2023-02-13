source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.3"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4"

# Use mysql as the database for Active Record
gem "mysql2", "~> 0.5"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

gem 'dotenv-rails'
gem 'enum_help'
gem 'faraday'
gem 'firebase-admin-sdk'
gem 'google-apis-calendar_v3'
gem 'jwt'
gem 'kaminari'
gem 'line-bot-api'
gem 'rack-cors'
gem 'rails-i18n', '~> 7.0.0'
gem 'rollbar'
gem 'seed-fu', github: 'shun0211/seed-fu', branch: 'support-rails-7'
gem "sidekiq-scheduler"
gem "slack-notifier"
# gem 'whenever'

group :production do
  gem 'unicorn'
end

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
  gem 'annotate'
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
end

group :test do
  gem 'committee-rails'
  gem 'factory_bot_rails'
  gem 'rspec-json_matcher'
  gem 'rspec-rails'
end

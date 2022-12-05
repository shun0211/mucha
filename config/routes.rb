Rails.application.routes.draw do
  post 'line_bot/callback', to: 'line_bot/callbacks#callback'
  get 'line-bot/link', to: 'line_bot/callbacks#link'
  namespace 'api' do
    namespace 'v1' do
      get "healthcheck", to: "healthcheck#healthcheck"
      resources :users, only: [:create]
      resources :notices
    end
  end
end

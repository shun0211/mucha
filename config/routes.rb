require 'sidekiq/web'

Rails.application.routes.draw do
  post 'line_bot/callback', to: 'line_bot/callbacks#callback'
  get 'line_bot/link', to: 'line_bot/callbacks#link'
  get "healthcheck", to: "healthcheck#healthcheck"

  namespace 'api' do
    namespace 'v1' do
      resources :users, only: [:create]
      get 'current-user', to: 'users#show_current_user'
      post 'login', to: 'auth#login'
      delete 'logout', to: 'auth#logout'
      resources :notices
      put 'notices/:id/draft', to: "notices#update_to_draft"
      resources :group_talk_rooms
    end
  end

  namespace 'admin' do
    mount Sidekiq::Web, at: '/sidekiq'
  end
end

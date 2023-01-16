require 'sidekiq/web'

Rails.application.routes.draw do
  post 'line_bot/callback', to: 'line_bot/callbacks#callback'
  get 'line_bot/link', to: 'line_bot/callbacks#link'
  get "healthcheck", to: "healthcheck#healthcheck"

  namespace 'api' do
    namespace 'v1' do
      resources :users, only: [:create]
      get 'current-user', to: 'users#show_current_user'
      resources :notices
      put 'notices/:id/draft', to: "notices#update_to_draft"
      put 'notices/:id/scheduled', to: "notices#update_to_scheduled"
      resources :group_talk_rooms
      post 'line_bots/link', to: "line_bots#link"
      post 'custom-token', to: "auths#fetch_custom_token"
      # Liff アプリからトークンを取得する場合のエンドポイント
      namespace 'liff' do
        get 'custom-token', to: "auths#fetch_custom_token"
      end
    end
  end

  namespace 'admin' do
    mount Sidekiq::Web, at: '/sidekiq'
  end
end

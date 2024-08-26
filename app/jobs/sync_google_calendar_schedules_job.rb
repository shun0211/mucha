require 'google/apis/calendar_v3'
require 'google/api_client/client_secrets'

class SyncGoogleCalendarSchedulesJob
  include Sidekiq::Worker
  include Rails.application.routes.url_helpers

  queue_as :low

  def perform
    User.find_each do |user|
      next unless user.google_calendar_sync_enabled?

      user.google_calendar_tokens.each do |token|
        auth_client.refresh_token = token.refresh_token
        auth_client.refresh!

        Schedules::GoogleCalendar::CreateService.new(user, auth_client).execute!
      end
    end
  end

  private def auth_client
    return @auth_client if @auth_client.present?

    client_secrets = Google::APIClient::ClientSecrets.new({
      "web": {
        "client_id": ENV['GOOGLE_CALENDAR_CLIENT_ID'],
        "client_secret": ENV['GOOGLE_CALENDAR_CLIENT_SECRET'],
        "redirect_uris": [api_v1_google_calendar_callback_url(host: ENV['MUCHA_SERVER_HOST'])],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token"
      }
    })
    @auth_client = client_secrets.to_authorization
    @auth_client.update!(
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      additional_parameters: {
        access_type: 'offline',
        prompt: 'consent',
        session: false
      }
    )
  end
end

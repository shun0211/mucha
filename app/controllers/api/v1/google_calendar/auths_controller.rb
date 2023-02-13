require 'google/apis/calendar_v3'
require 'google/api_client/client_secrets'

class Api::V1::GoogleCalendar::AuthsController < SecuredController
  skip_before_action :authorize_request, only: [:callback]

  def authorize
    auth_uri = auth_client.authorization_uri.to_s
    session[:id_token] = request.headers['Authorization'].split(' ').last
    render json: { redirectUrl: auth_uri }, status: :ok
  end

  # スケジュール作成の部分は非同期化する
  def callback
    # 別の場所に移したい
    # 今考えているのは secured_controller.rb のメソッドで動くようにすること
  begin
    service = Auths::AuthorizationService.new(session[:id_token])
    service.authenticate_request!
    @current_user = service.user

  rescue Firebase::Admin::Auth::InvalidTokenError,
         Firebase::Admin::Auth::ExpiredTokenError,
         Firebase::Admin::Auth::CertificateRequestError,
         Firebase::Admin::Auth::InvalidCertificateError => e
    render_unauthorized_error('不正なIDトークンです👎', e)
  end

    return if params[:code].nil?

    auth_client.code = params[:code]
    auth_client.fetch_access_token!

    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = @auth_client

    google_calendar_token = GoogleCalendarToken.find_or_initialize_by(user: current_user)
    google_calendar_token.assign_attributes(refresh_token: @auth_client.refresh_token, google_calendar_id: service.get_calendar('primary').id)
    google_calendar_token.save!

    event_list = service.list_events('primary', time_min: Time.zone.now.rfc3339, time_max: 1.month.since.in_time_zone.rfc3339 )
    event_list.items.each do |event|
      Schedule.transaction do
        schedule = current_user.schedules.find_or_initialize_by(uid: event.i_cal_uid)
        # スケジュールの詳細が変更になっているかもしれないので、再代入する
        schedule.assign_attributes(
          title: event.summary || '（タイトルなし）',
          description: event.description || '',
          start_time: event.start.date || event.start.date_time,
          end_time: event.end.date || event.end.date_time,
          all_day: event.start.date_time.nil? && event.end.date_time.nil?,
          source: 'google_calendar',
          source_url: event.html_link,
          notice_minutes_ago: 10
        )
        if schedule.changed? && schedule.save!
          notice = schedule.notice || Notice.new(schedule: schedule)
          Notices::DeleteJobService.new(notice).execute! unless notice.new_record?

          notice.assign_attributes(
            title: schedule.title,
            message: schedule.description,
            scheduled_at: schedule.start_time - schedule.notice_minutes_ago.minutes,
            to_line_id: current_user.line_user_id,
            talk_type: "dm",
            status: "scheduled",
            source: "google_calendar",
            repeat: false,
            user: current_user
          )
          notice.save!
          Notices::SetJobService.new(notice).execute!
        end
      end
    end

    redirect_to "#{ENV['FRONT_URI']}/notices?googleCalendarLinkageSuccess=true", allow_other_host: true
  end

  private def auth_client
    return @auth_client if @auth_client.present?

    client_secrets = Google::APIClient::ClientSecrets.new({
      "web": {
        "client_id": ENV['GOOGLE_CALENDAR_CLIENT_ID'],
        "client_secret": ENV['GOOGLE_CALENDAR_CLIENT_SECRET'],
        "redirect_uris": [api_v1_google_calendar_callback_url],
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

class Api::V1::NoticesController < ApplicationController
  # TODO: 並び替えと検索
  # /notices/scheduled
  # /notices/draft
  # /notices/sent
  # のようにエンドポイントが分かれていたほうが分かりやすいかもしれない
  def index
    @notices = current_user
      .notices
      .where(status: params[:status])
      .page(params[:page])
  end

  def create
    @notice = current_user.notices.build(notice_params)
    @notice.to_line_id = "xxxxxxxxxx"
    if @notice.save
      render :show, status: :created
    else
      render_not_acceptable_error(@notice.errors.full_messages, '')
    end
  end

  def update
    @notice = current_user.notices.find_by(id: params[:id])
    return render_unauthorized_error('', 'Invalid Notice Id') if @notice.nil?

    if @notice.update(notice_params)
      render :show, status: :ok
    else
      render_not_acceptable_error(@notice.errors.full_messages, '')
    end
  end

  def destroy
    @notice = current_user.notices.find_by(id: params[:id])
    return render_unauthorized_error('', 'Invalid Notice Id') if @notice.nil?

    @notice.destroy
  end

  private def notice_params
    params.permit(
      :title,
      :scheduled_at,
      :sent_at,
      :message,
      :repeat,
      :monday,
      :tuesday,
      :wednesday,
      :thursday,
      :friday,
      :saturday,
      :sunday,
      :talk_type,
      :to_line_id,
      :status
    )
  end
end

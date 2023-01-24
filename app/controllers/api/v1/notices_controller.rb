class Api::V1::NoticesController < SecuredController
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
    if @notice.valid?
      # line_message_jobs の作成に失敗したときは notice レコードも作らない
      Notice.transaction do
        @notice.save!
        Notices::SetJobService.new(@notice).execute!
      end
      render :show, status: :created
    else
      render_not_acceptable_error(@notice.errors.full_messages, '')
    end
  end

  # 現状使っていない
  def update
    @notice = current_user.notices.find_by(id: params[:id])
    return render_unauthorized_error('', 'Invalid Notice Id') if @notice.nil?

    if @notice.update(notice_params)
      render :show, status: :ok
    else
      render_not_acceptable_error(@notice.errors.full_messages, '')
    end
  end

  def update_to_draft
    @notice = current_user.notices.find_by(id: params[:id])
    return render_unauthorized_error('', 'Invalid Notice Id') if @notice.nil?

    Notice.transaction do
      @notice.draft!
      Notices::DeleteJobService.new(@notice).execute!
    end
  end

  def update_to_scheduled
    @notice = current_user.notices.find_by(id: params[:id])
    return render_unauthorized_error('', 'Invalid Notice Id') if @notice.nil?

    Notice.transaction do
      @notice.scheduled!
      Notices::SetJobService.new(@notice).execute!
    end
  end

  def destroy
    @notice = current_user.notices.find_by(id: params[:id])
    return render_unauthorized_error('', 'Invalid Notice Id') if @notice.nil?

    Notice.transaction do
      Notices::DeleteJobService.new(@notice).execute!
      @notice.delete
    end
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
      :status,
      :to_line_id
    )
  end
end

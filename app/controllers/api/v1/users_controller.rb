class Api::V1::UsersController < SecuredController
  def show_current_user
    @user = current_user
    render :show, status: :ok
  end

  def follow
    current_user.update(is_friend: true)
    render json: {}, status: :ok
  end
end

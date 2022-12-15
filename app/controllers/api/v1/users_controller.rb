class Api::V1::UsersController < SecuredController
  def show_current_user
    @user = current_user
    render :show, status: :ok
  end
end

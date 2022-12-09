class Api::V1::UsersController < ApplicationController
  def show_current_user
    @user = User.find(1)
    render :show, status: :ok
  end
end

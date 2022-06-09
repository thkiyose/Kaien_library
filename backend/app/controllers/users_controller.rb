class UsersController < ApplicationController
  def create
    @user = User.new
    if @user.save
      render json: { status:"SUCCESS", data: @user}
    else
      render json: { @user.errors, status: 500 }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name,:email,:password,:password_confirmation)
  end
end

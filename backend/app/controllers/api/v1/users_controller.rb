class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only:[:show]

  def show
    @user = User.find_by(id: params[:id])
    render json: { user: @user }
  end

  def check_email_unique
    user_existence = User.exists?(email: params[:email])
    render json: { user_existence: user_existence }
  end
end

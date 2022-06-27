class Api::V1::UsersController < ApplicationController

  def check_email_unique
    user_existence = User.exists?(email: params[:email])
    render json: { user_existence: user_existence }
  end
end

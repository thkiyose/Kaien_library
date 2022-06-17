class Api::V1::Auth::RegistrationsController < ApplicationController
  def create
    @user = User.new(sign_up_params)
    if @user.save!
      render json: { status:"SUCCESS", data: @user}
    else
      render json: { status: 500, message: "aaa" }
    end
  end

  def check_email_unique
    render json: { message:"test" }
  end

  private

  def sign_up_params
    params.require(:user).permit(:name,:email,:password,:password_confirmation)
  end
end

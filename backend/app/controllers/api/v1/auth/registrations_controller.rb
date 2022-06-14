class Api::V1::Auth::RegistrationsController < ApplicationController
  def create
    @user = User.new(sign_up_params)
    if @user.save!
      render json: { status:"SUCCESS", data: @user}
    else
      render json: { status: 500 }
    end
  end

  private

  def sign_up_params
    params.permit(:name,:email,:password,:password_confirmation)
  end
end

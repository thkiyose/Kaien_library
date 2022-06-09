class UsersController < ApplicationController
  def create
    user = User.new
    if user.save
      render json: { status:"SUCCESS", data: user}
    else
      render json: { user.errors, status: 422 }
    end
  end
end

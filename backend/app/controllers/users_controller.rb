class UsersController < ApplicationController
  def create
    user = User.new
    if user.save
      render json: post
    else
      render json: post.erros, status: 422
    end
  end
end

class Api::V1::UsersController < ApplicationController
  def show
    render json: {message: "aaa"}
  end
end

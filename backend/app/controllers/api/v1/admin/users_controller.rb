class Api::V1::Admin::UsersController < ApplicationController
  def index
    users = User.all.map{|user|{ id: user.id, name: user.name, email: user.email, admin: user.admin }}
    render json: { users: users }
  end

  def destroy
    user = User.find_by(id:params[:id])
    if user.destroy
      render json: {status:"SUCCESS"}
    end
  end
end

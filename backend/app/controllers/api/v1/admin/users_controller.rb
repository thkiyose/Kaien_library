class Api::V1::Admin::UsersController < ApplicationController
  def index
    users = User.includes(:lendings).map{|user|{ id: user.id, name: user.name, email: user.email, admin: user.admin, is_lending: user.lendings.any?}}
    render json: { users: users }
  end

  def destroy
    user = User.find_by(id:params[:id])
    if !user.lendings.where(finished_at: nil).exists? && user.destroy
      render json: {status:"SUCCESS"}
    end
  end
end

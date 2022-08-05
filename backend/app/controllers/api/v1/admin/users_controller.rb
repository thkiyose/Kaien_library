class Api::V1::Admin::UsersController < ApplicationController
  def user_index
    users = User.all.map{|user|{ id: user.id, name: user.name, email: user.email, admin: user.admin }}
    render json: { users: users }
  end
end

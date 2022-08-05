class Api::V1::Admin::UsersController < ApplicationController
  def index
    users = User.where(deleted: false).map{|user|{ id: user.id, name: user.name, email: user.email, admin: user.admin }}
    render json: { users: users }
  end

  def destroy
    user = User.find_by(id:params[:id])
    if user.update(deleted:true, uid: nil, email:nil, name:"退会済みユーザー", encrypted_password: nil)
      render json: {status:"SUCCESS"}
    end
  end
end

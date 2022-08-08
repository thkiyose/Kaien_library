class Api::V1::Admin::UsersController < ApplicationController
  def index
    lending_users = User.includes(:lendings).where(lendings: {finished_at: nil})
    not_lending_users = (User.all - lending_users)
    users = not_lending_users.as_json.map{|user| user.merge({"is_lending"=>false})} + lending_users.as_json.map{|user| user.merge({"is_lending"=>true})}
    render json: { users: users.sort_by{|user| user["id"]} }
  end

  def update
    user = User.find_by(id:params[:id])
    if user.update(admin: !user.admin)
      render json: {status: "SUCCESS"}
    else
      render json: user.errors
    end
  end

  def destroy
    user = User.find_by(id:params[:id])
    if user.lendings.where(finished_at: nil).empty? && user.destroy
      render json: {status:"SUCCESS"}
    end
  end
end

class Api::V1::Admin::UsersController < ApplicationController
  def index
    lending_users = User.joins(:lendings).where("lendings.id IS NOT NULL").where("lendings.finished_at IS NULL").distinct
    not_lending_users = (User.all - lending_users)
    users = not_lending_users.as_json.map{|user| user.merge({"is_lending"=>false})} + lending_users.as_json.map{|user| user.merge({"is_lending"=>true})}
    render json: { users: users.sort_by{|user| user["id"]} }
  end

  def update
    user = User.find_by(id:params[:id])
    if user.admin == true && User.where(admin:true).count == 1
      render json: {error: "管理者は最低一人必要です。"}
      return
    end
    if user.update(admin: !user.admin)
      if user.admin == false
        render json: {status: "SUCCESS", admin_to_normal: true, user: user}
      else
        render json: {status: "SUCCESS", user: user}
      end
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

  def search
    if params
      users = User.search_with_id(params[:id]).search_with_name(params[:name]).search_with_email(params[:email]).search_with_admin(params[:admin])
    end
    render json: { users: users }
  end
end

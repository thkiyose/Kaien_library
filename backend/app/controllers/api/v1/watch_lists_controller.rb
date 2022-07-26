class Api::V1::WatchListsController < ApplicationController
  def create
    user = User.find_by(id: params[:id])
    watch_list = user.watch_lists.build(book_id: params[:book_id])
    if watch_list.save
      render json: { status: "SUCCESS", id: watch_list.id }
    else
      render json: watch_list.errors, status: 422
    end
  end

  def destroy
    watch_list = WatchList.find_by(id:params[:id])
    if watch_list.destroy
      render json: { status: "SUCCESS" }
    else
      render json :watch_list.errors, status: 422
    end
  end

  def is_watching
    user = User.find_by(id: params[:id])
    watch_list = user.watch_lists.where(book_id: params[:book_id])
    if watch_list.exists?
      render json: { is_watching: true, id: user.watch_lists.find_by(book_id: params[:book_id]).id }
    else
      render json: { is_watching: false, id: nil }
    end
  end
end

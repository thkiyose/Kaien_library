class Api::V1::WatchListsController < ApplicationController
  def create
    user = User.find_by(id: params[:id])
    watch_list = user.watch_lists.build(book_id: params[:book_id])
    if watch_list.save
      render json: { status: "SUCCESS" }
    else
      render json: watch_list.errors, status: 422
    end
  end

  def is_watching
  end
end

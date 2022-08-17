class Api::V1::Admin::ReviewsController < ApplicationController
  def index
    reviews = Review.left_joins(:book,:user).includes(:user).order(created_at: :desc).select(:id,:title,:user_id,:book_id,:rating,:comment,:name,:email)
    render json: {reviews: reviews}
  end

  def destroy
    review = Review.find_by_id(params[:id])
    if review.destroy
      render json: {status:"SUCCESS"}
    else
      render json: review.errors
    end
  end

  def search
    reviews = Review.left_joins(:book,:user).order(created_at: :desc)
    .search_with_book_title(params[:book_title])
    .search_with_user_name(params[:user_name])
    .search_with_user_email(params[:user_email])
    # .search_with_user_id(params[:user_id])
    # .search_with_comment(params[:comment])
    # .search_with_start_date(params[:start_date][0],params[:start_date][1])
    # .search_with_finished_at(params[:finished_at][0],params[:finished_at][1])
    .select(:id,:title,:user_id,:book_id,:rating,:comment,:name,:email)
    render json: { reviews: reviews }
  end
end

class Api::V1::Admin::ReviewsController < ApplicationController
  def index
    reviews = Review.joins(:book, :user).order(created_at: :desc).select(:id,:title,:user_id,:book_id,:rating,:comment,:name,:email)
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
end

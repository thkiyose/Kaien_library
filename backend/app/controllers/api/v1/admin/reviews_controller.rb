class Api::V1::Admin::ReviewsController < ApplicationController
  def index
    reviews = Review.joins(:book, :user).order(created_at: :desc).select(:id,:title,:user_id,:book_id,:rating,:comment,:name,:email)
    render json: {reviews: reviews}
  end
end

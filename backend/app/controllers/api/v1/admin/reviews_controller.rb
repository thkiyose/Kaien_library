class Api::V1::Admin::ReviewsController < ApplicationController
  def index
    reviews = Review.joins(:book).order(created_at: :desc).select(:id,:title,:user_id,:book_id)
    render json: {reviews: reviews}
  end
end

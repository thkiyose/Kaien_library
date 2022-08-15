class Api::V1::Admin::ReviewsController < ApplicationController
  def index
    reviews = Review.all.order(created_at: :desc)
    render json: {reviews: reviews}
  end
end

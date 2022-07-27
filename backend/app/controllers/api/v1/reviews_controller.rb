class Api::V1::ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)
  end

  private

  def review_params
    params.require(:review).permit(:user_id,:book_id,:rating,:comment)
  end
end

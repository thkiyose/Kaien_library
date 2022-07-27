class Api::V1::ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)
    if review.save!
      render json: { status:"SUCCESS", data: review}
    else
      render json:  review.errors, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:user_id,:book_id,:rating,:comment)
  end
end

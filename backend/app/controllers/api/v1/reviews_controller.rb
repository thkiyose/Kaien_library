class Api::V1::ReviewsController < ApplicationController
  def index
    book = Book.find_by(id:params[:id])
    render json: { reviews: book.reviews.joins(:user).select(:name, :rating, :comment, :created_at ) }
  end

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

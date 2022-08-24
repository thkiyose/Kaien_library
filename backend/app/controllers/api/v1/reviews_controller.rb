class Api::V1::ReviewsController < ApplicationController
  before_action :set_review, only: [:update,:destroy]

  def index
    book = Book.find_by(id:params[:book_id])
    if book.reviews.count > 0
      average = book.reviews.average(:rating).round(1).to_f
    else
      average = 0
    end
    render json: {
      reviews: book.reviews.left_joins(:user).order(created_at: :desc).select(:user_id, :name, :rating, :comment, :created_at ),
      already_reviewed: book.reviews.where(user_id:params[:user_id]).exists?,
      average: average}
  end

  def user_reviews
    user = User.find_by(id: params[:user_id])
    render json: { reviews: user.reviews.joins(:book).order(created_at: :desc).select(:id, :rating, :comment, :title, :created_at, :book_id )}
  end

  def create
    review = Review.new(review_params)
    if review.save!
      render json: { status:"SUCCESS", data: review}
    else
      render json:  review.errors, status: 422
    end
  end

  def update
    review = Review.find_by_id(params[:id])
    if review.update(review_params)
      render json: { status: "SUCCESS"}
    else
      render json:  review.errors, status: 422
    end
  end

  def destroy
    review = Review.find_by_id(params[:id])
    if review.destroy
      render json: { status:"SUCCESS"}
    else
      render json:  review.errors, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:user_id,:book_id,:rating,:comment)
  end

  def set_review
    review = Review.find_by_id(params[:id])
  end
end

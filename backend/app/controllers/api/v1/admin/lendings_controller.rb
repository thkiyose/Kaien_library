class Api::V1::Admin::LendingsController < ApplicationController
  def index
    lendings = Lending.joins(:book).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:finished_at)
    render json: { lendings: lendings }
  end
end

class Api::V1::LendingsController < ApplicationController
  require 'date'

  def show
    user = User.find_by(id: params[:id])
    lendings = user.lendings.where(finished_at: nil).order(expiry_date: :asc).map{|lending| {
                                            id: lending.id,
                                            start_date: lending.start_date,
                                            expiry_date: lending.expiry_date,
                                            finished_at: lending.finished_at,
                                            title: lending.book.title,
                                            book_id: lending.book.id,
                                            location: lending.book.location.location }}
    render json: { lendings: lendings }
  end

  def create
    lending = Lending.new(lending_params)
    book = Book.find_by(id: params[:book_id])
    if book.is_lent == false
      if lending.save!
        book.update(is_lent:true)
        render json: { status:"SUCCESS", location: book.location.location}
      else
        render json:  lending.errors, status: 422
      end
    else
      render json: { message: "この書籍は貸出中です。"}
    end
  end

  def fetch_lending
    lending = Lending.find_by(id: params[:id])
    render json: { book: lending.book, location: lending.book.location.location, user_id: lending.user.id }
  end

  def return
    user = User.find_by(id: params[:user_id])
    lending = Lending.find_by(id: params[:id])
    book = lending.book

    if user.id != lending.user.id
      render json: { message: "レンタルをしたユーザー以外は返却出来ません。"}
    else
      lending.update(finished_at: Date.today)
      book.update(is_lent: false)
      render json: { status: "SUCCESS"}
    end
  end

  private

  def lending_params
    params.require(:lending).permit(:user_id,:book_id,:start_date,:expiry_date)
  end
end

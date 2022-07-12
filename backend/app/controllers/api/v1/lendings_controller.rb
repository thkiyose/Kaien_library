class Api::V1::LendingsController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    lendings = user.lendings.where(finished_at: nil).order(expiry_date: :asc).map{|lending| {
                                            id: lending.id,
                                            start_date: lending.start_date,
                                            expiry_date: lending.expiry_date,
                                            finished_at: lending.finished_at,
                                            title: lending.book.title,
                                            book_id: lending.book.id }}
    render json: { lendings: lendings }
  end

  def create
    lending = Lending.new(lending_params)
    book = Book.find_by(id: params[:book_id])
    if book.is_lent == false
      if lending.save!
        book.update(is_lent:true)
        render json: { status:"SUCCESS"}
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

  def is_current_user_lending
    user = User.find_by(id: params[:user_id])
    render json: { is_lending: user.lendings.where(book_id:params[:book_id], finished_at: nil).exists? }
  end

  def return
    binding.pry
  end

  private

  def lending_params
    params.require(:lending).permit(:user_id,:book_id,:start_date,:expiry_date)
  end
end

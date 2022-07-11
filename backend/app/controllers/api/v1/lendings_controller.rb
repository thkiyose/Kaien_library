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

  def fetch_lending_user
    lending_user = Lending.find_by(id: params[:id]).user
    render json: { user_id: lending_user.id }
  end

  private

  def lending_params
    params.require(:lending).permit(:user_id,:book_id,:start_date,:expiry_date)
  end
end

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
    reservations = user.reservations.where('expiry_date >= ?', Date.today).order(start_date: :desc).map{|reservation|{
                                            id: reservation.id,
                                            start_date: reservation.start_date,
                                            expiry_date: reservation.expiry_date,
                                            book_id: reservation.book.id,
                                            title: reservation.book.title,
                                            can_lend: reservation.book.is_lent == false && reservation.start_date <= Date.today}}
    render json: { lendings: lendings, reservations: reservations }
  end

  def show_previous
    user = User.find_by(id: params[:id])
    lendings = user.lendings.joins(:book).where.not(finished_at: nil).order(start_date: :desc).select(:book_id,:start_date,:finished_at,:title)
    render json: { lendings: lendings }
  end

  def create
    lending = Lending.new(lending_params)
    book = Book.find_by(id: params[:book_id])
    if book.is_lent == false && book.deleted == false
      if lending.save!
        book.update(is_lent:true)
        render json: { status:"SUCCESS", location: book.location.location}
      else
        render json:  lending.errors, status: 422
      end
    else
      render json: { message: "この書籍は貸出出来ません。"}
    end
  end

  def create_from_reservation
    reservation = Reservation.find_by(id:params[:id])
    user = User.find_by(id:params[:user_id])
    book = Book.find_by(id:reservation.book_id)
    if reservation.user_id == user.id && book.deleted == false
      user.lendings.create(book_id:reservation.book_id, start_date:reservation.start_date, expiry_date: reservation.expiry_date)
      book.update(is_lent: true)
      reservation.destroy
      render json: { status: "SUCCESS", location: book.location.location}
    else
      render json: { message: "レンタルに失敗しました。"}
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

class Api::V1::ReservationsController < ApplicationController
  require 'date'

  def create
    reservation = Reservation.new(reservation_params)
    book = Book.find_by(id: params[:book_id])
    if reservation.save!
      render json: { status:"SUCCESS" }
    else
      render json:  lending.errors, status: 422
    end
  end

  def fetch_lendings_and_reservations
    book = Book.find_by(id: params[:id])
    # 本に紐付いている貸出データから返却されていないもののみを取得
    lendings = book.lendings.where(finished_at: nil)
    # 本に紐付いている予約データを取得
    reservations = book.reservations
    render json: { lendings: lendings, reservations: reservations }
  end

  def fetch_current_user_reservation
    book = Book.find_by(id: params[:id])
    reservation = book.reservations.where(user_id:params[:user_id]).where('start_date <= ?', Date.today).where('expiry_date >= ?', Date.today)
    if reservation
      render json: { reservation: reservation.first, book: book }
    else
      render json: { message:"予約が見つかりませんでした。"}
    end
  end

  def destroy
    if Reservation.find_by(id:params[:id]).destroy
      render json: { status: "SUCCESS"}
    end
  end

  def reservation_params
    params.require(:reservation).permit(:user_id,:book_id,:start_date,:expiry_date)
  end

end

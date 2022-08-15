class Api::V1::Admin::ReservationsController < ApplicationController
  def index
    if !params[:show_expired].blank?
      reservations = Reservation.joins(:book).show_expired(params[:show_expired]).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:expiry_date,:user_id)
    else
      reservations = Reservation.joins(:book).where('expiry_date > ?',Date.today).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:expiry_date,:user_id)
    end
    render json: { reservations: reservations }
  end

  def destroy
    reservation = Reservation.find_by(id:params[:id])
    if reservation.destroy
      render json: {status:"SUCCESS"}
    end
  end

  def search
    reservations = Reservation.joins(:book,:user).order(created_at: :desc)
    .show_expired(params[:show_expired])
    .select(:id,:book_id,:title,:start_date,:expiry_date,:user_id)
    render json: { reservations: reservations }
  end
end

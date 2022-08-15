class Api::V1::Admin::ReservationsController < ApplicationController
  def index
    if !params[:show_finished].blank?
      reservations = Reservation.joins(:book).show_finished(params[:show_finished]).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:expiry_date,:user_id)
    else
      reservations = Reservation.joins(:book).where('expiry_date <= ?',Date.today).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:expiry_date,:user_id)
    end
    render json: { reservations: reservations }
  end
end

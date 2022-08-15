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
    reservations = Reservation.joins(:book,:user).order(start_date: :desc)
    .show_expired(params[:show_expired])
    .search_with_book_title(params[:title])
    .search_with_user_name(params[:user_name])
    .search_with_user_email(params[:user_email])
    .search_with_user_id(params[:user_id])
    .search_with_start_date(params[:start_date][0],params[:start_date][1])
    .search_with_expiry_date(params[:expiry_date][0],params[:expiry_date][1])
    .select(:id,:book_id,:title,:start_date,:expiry_date,:user_id)
    render json: { reservations: reservations }
  end
end

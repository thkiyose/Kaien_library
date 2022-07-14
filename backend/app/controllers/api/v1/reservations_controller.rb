class Api::V1::ReservationsController < ApplicationController
  def fetch_lendings_and_reservations
    render json: { params: params}
  end
end

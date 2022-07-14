class Api::V1::ReservationsController < ApplicationController
  def fetch_lendings_and_reservations
    book = Book.find_by(id: params[:id])
    # 本に紐付いている貸出データから返却されていないもののみを取得
    lendings = book.lendings.where(finished_at: nil)
    render json: { lendings: lendings }
  end
end

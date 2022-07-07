class Api::V1::LendingsController < ApplicationController
  def create
    lending = Lending.new(lending_params)
    if Book.find_by(id: params[:book_id]).is_lent == false
      if lending.save!
        render json: { status:"SUCCESS"}
      else
        render json:  lending.errors, status: 422
      end
    else
      render json: { message: "この書籍は貸出中です。"}
    end
  end

  private

  def lending_params
    params.require(:lending).permit(:user_id,:book_id,:start_date,:expiry_date)
  end
end

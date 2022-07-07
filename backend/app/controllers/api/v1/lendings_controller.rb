class Api::V1::LendingsController < ApplicationController
  def create
    lending = Lending.new(lending_params)
    if lending.save!
      render json: { status:"SUCCESS"}
    else
      render json:  lending.errors, status: 422
    end
  end

  private

  def lending_params
    params.require(:lending).permit(:book_id,:start_date,:expiry_date)
  end
end

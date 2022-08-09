class Api::V1::Admin::LendingsController < ApplicationController
  def index
    lendings = Lending.joins(:book).where(finished_at:nil).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:finished_at)
    render json: { lendings: lendings }
  end

  def destroy
    lending = Lending.find_by(id:params[:id])
    if lending.destroy
      render json: {status:"SUCCESS"}
    end
  end

  def search
    lendings = Lending.joins(:book).order(created_at: :desc).show_finished(params[:show_finished]).select(:id,:book_id,:title,:start_date,:finished_at)
    render json: { lendings: lendings }
  end
end

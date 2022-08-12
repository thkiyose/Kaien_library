class Api::V1::Admin::LendingsController < ApplicationController
  def index
    if !params[:show_finished].blank?
      lendings = Lending.joins(:book).show_finished(params[:show_finished]).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:finished_at,:user_id)
    else
      lendings = Lending.joins(:book).where(finished_at:nil).order(created_at: :desc).select(:id,:book_id,:title,:start_date,:finished_at,:user_id)
    end
    render json: { lendings: lendings }
  end

  def destroy
    lending = Lending.find_by(id:params[:id])
    if lending.destroy
      render json: {status:"SUCCESS"}
    end
  end

  def update
    lending = Lending.find_by(id:params[:id])
    book = lending.book
    if lending.update(finished_at: Date.today)
      book.update(is_lent: false)
      render json: {status:"SUCCESS"}
    end
  end

  def search
    lendings = Lending.joins(:book,:user).order(created_at: :desc)
    .show_finished(params[:show_finished])
    .search_with_book_title(params[:title])
    .search_with_user_name(params[:user_name])
    .search_with_user_email(params[:user_email])
    .search_with_user_id(params[:user_id])
    .search_with_start_date(params[:start_date][0],params[:start_date][1])
    .select(:id,:book_id,:title,:start_date,:finished_at,:user_id)
    render json: { lendings: lendings }
  end
end

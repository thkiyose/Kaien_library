class Api::V1::Admin::BooksController < ApplicationController

  def index
    books = Book.includes(:reservations).where(deleted:false).map{|book|{ id: book.id, title: book.title, is_lent: book.is_lent, is_reserved: book.reservations.any? }}
    render json: { books: books }
  end

  def search
    books = Book.includes(:reservations).where(deleted: false).search_with_free_word(params[:q]).search_with_category(params[:category]).map{|book|{ id: book.id, title: book.title, is_lent: book.is_lent, is_reserved: book.reservations.any? }}
    render json: { books: books }
  end

  def destroy
    book = Book.find_by(id: params[:id])
    if book.is_lent == false && !Reservation.where(book_id: book.id).exists?
      book.update(deleted:true)
    else
      render json: {message:"貸出中につき削除出来ません。"}
    end
  end

  def import_from_csv
    if params[:_json].length <= 1
      render json: { error: "csvの内容が不足しているため、登録を行えません。"}
      return
    end
    puts params[:json]
    headers = params[:_json][0]
    datas = params[:_json][1..-1]

    datas.each do |row|
      book = Book.new
      headers.each_with_index do |head,index|
        book[head] = row[index]
      end
    end
  end
end

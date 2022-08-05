class Api::V1::Admin::BooksController < ApplicationController
  def index
    books = Book.includes(:reservations).where(deleted:false).map{|book|{ id: book.id, title: book.title, is_lent: book.is_lent, is_reserved: book.reservations.any? }}
    render json: { books: books }
  end

  def search
    books = Book.includes(:reservations).where(deleted: false).search_with_free_word(params[:q]).search_with_category(params[:category]).map{|book|{ id: book.id, title: book.title, is_lent: book.is_lent, is_reserved: book.reservations.any? }}
    render json: { books: books }
  end
end

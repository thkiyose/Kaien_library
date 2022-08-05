class Api::V1::AdminController < ApplicationController
  def book_index
    books = Book.includes(:reservations).where(deleted:false).map{|book|{ id: book.id, title: book.title, is_lent: book.is_lent, is_reserved: book.reservations.any? }}
    render json: { books: books }
  end

  def user_index
    users = User.all.map{|user|{ id: user.id, name: user.name, email: user.email, admin: user.admin }}
    render json: { users: users }
  end

  def search_books
    books = Book.includes(:reservations).where(deleted: false).search_with_free_word(params[:q]).search_with_category(params[:category]).map{|book|{ id: book.id, title: book.title, is_lent: book.is_lent, is_reserved: book.reservations.any? }}
    render json: { books: books }
  end
end

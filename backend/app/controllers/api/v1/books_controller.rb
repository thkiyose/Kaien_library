class Api::V1::BooksController < ApplicationController
  require "open-uri"
  require "date"

  def index
    books = Book.where(deleted:false)
    render json: { books: books }
  end

  def index_for_admin
    books = Book.includes(:reservations).where(deleted:false).map{|book|{ id: book.id, title: book.title, is_lent: book.is_lent, is_reserved: book.reservations.any? }}
    render json: { books: books }
  end

  def search
    if params[:q].present? && params[:category].present?
      books = Book.where(deleted: false).where(['title like ? or author like ? or description like ? or published_year like ?',"%#{params[:q]}%","%#{params[:q]}%","%#{params[:q]}%","%#{params[:q]}%"]).where(category_id: params[:category])
    elsif params[:q].present? && !params[:category].present?
      books = Book.where(deleted: false).where(['title like ? or author like ? or description like ? or published_year like ?',"%#{params[:q]}%","%#{params[:q]}%","%#{params[:q]}%","%#{params[:q]}%"])
    elsif !params[:q].present? && params[:category].present?
      books = Book.where(deleted: false).where(category_id: params[:category])
    elsif !params[:q].present? && !params[:category].present?
      books = Book.where(deleted:false)
    end
    render json: { books: books }
  end

  def show
    book = Book.find_by(id: params[:id])
    user = User.find_by(id: params[:user_id])
    lendings = book.lendings.joins(:user).order(start_date: :desc).select(:id,:start_date,:expiry_date,:finished_at,:name)
    render json: { book: book, category: book.category, lendings: lendings, current_user_lending: user.lendings.where(book_id:params[:id], finished_at: nil).exists?,
                  other_user_reserved: { is_reserved: book.reservations.where.not(user_id: user.id).exists?, on_going: book.reservations.where.not(user_id: user.id).where('start_date <= ?', Date.today).where('expiry_date >= ?', Date.today).exists? },
                  current_user_reserved: { is_reserved: user.reservations.where(book_id: params[:id]).exists?, on_going: user.reservations.where(book_id: params[:id]).where('start_date <= ?', Date.today).where('expiry_date >= ?', Date.today).exists? }  }
  end

  def fetch_book_info
    isbn = params[:isbn]
    res = JSON.parse(Net::HTTP.get(URI.parse(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:#{isbn}"
  )))
    render json: { data:res }
  end

  def fetch_categories
    render json: { category: Category.all}
  end

  def fetch_locations
    render json: { location: Location.all}
  end

  def create
    book = Book.new(book_params)

    if book.save!
      if !book.image_url.nil?
        url = book.image_url
        file = "./public/#{book.id}.jpg"
        URI.open(file, 'w') do |pass|
          URI.open(url) do |recieve|
            pass.write(recieve.read.force_encoding(Encoding::UTF_8))
          end
        end
        book.update(image_url: file)
      end
      render json: { status:"SUCCESS", data: book}
    else
      render json:  book.errors, status: 422
    end
  end

  def delete_book
    book = Book.find_by(id: params[:id])
    if book.is_lent == false && !Reservation.where(book_id: book.id).exists?
      book.update(deleted:true)
    else
      render json: {message:"貸出中につき削除出来ません。"}
    end
  end

  private

  def book_params
    params.require(:book).permit(:isbn,:title,:author,:published_year,:description,:version,:category_id,:location_id,:image_url)
  end
end

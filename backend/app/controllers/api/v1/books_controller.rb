class Api::V1::BooksController < ApplicationController
  require "open-uri"

  def index
    books = Book.where(deleted:false)
    render json: {
      books: books
    }
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
    render json: { book: book, category: book.category, location: book.location }
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
    book.update(deleted:true)
  end

  private

  def book_params
    params.require(:book).permit(:isbn,:title,:author,:published_year,:description,:version,:category_id,:location_id,:image_url)
  end
end

class Api::V1::BooksController < ApplicationController
  def index
    render json: Book.all
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
    book.remote_image_url_url = params[:book][:image_url]
    begin
      if book.save!
        render json: { status:"SUCCESS", data: book}
      else
        render json:  book.errors, status: 422
      end
    rescue ActiveRecord::RecordInvalid
      book.image_url = nil
      book.save!
    end
  end

  private
  def book_params
    params.require(:book).permit(:isbn,:title,:author,:published_year,:description,:version,:category_id,:location_id,:image_url)
  end
end

class Api::V1::BooksController < ApplicationController
  def fetch_book_info
    isbn = params[:isbn]
    res = JSON.parse(Net::HTTP.get(URI.parse(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:#{isbn}"
  )))
    render json: { data:res }
  end
end
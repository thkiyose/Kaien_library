class Api::V1::Admin::BooksController < ApplicationController
  require "open-uri"

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
    header = params[:_json][0]
    data = params[:_json][1..-1]
    result = []

    data.each do |row|
      book = Book.new
      errors = []
      header.each_with_index do |head,index|
        case head
        when "isbn" then
          book.isbn = row[index].to_s
        when "title" then
          book.title = row[index].to_s
        when "author" then
          book.author = row[index].to_s
        when "category_id" then
          book.category_id = row[index].to_i
        when "published_year" then
          book.published_year = row[index].to_s
        when "description" then
          book.description = row[index].to_s
        when "image_url" then
          book.image_url = row[index].to_s
        when "location_id" then
          book.location_id = row[index].to_i
        when "version" then
          book.version = row[index].to_i
        else
          errors << "#{head}:ヘッダーが正しくありません。"
        end
      end
      load_image(book,book.image_url)
      if book.save
        result << {title: book.title, id: book.id, status: "SUCCESS", errors: errors}
      else
        result << {title: book.title, id: nil, status: "FAILURE", errors: errors}
      end
    end
    render json: {result: result}
  end

  private

    def load_image(book,image_url)
      if image_url.present?
        url = image_url
        file = "./public/#{book.id}.jpg"
        URI.open(file, 'w') do |pass|
          URI.open(url) do |recieve|
            pass.write(recieve.read.force_encoding(Encoding::UTF_8))
          end
        end
        book.image_url = file
      end
    end
end

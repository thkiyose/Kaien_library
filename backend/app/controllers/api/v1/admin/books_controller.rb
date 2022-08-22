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
      render json: { process:"FAILURE",error: "csvの内容が不足しているため、登録を行えません。"}
      return
    end
    header = params[:_json][0]
    data = params[:_json][1..-1]
    result = []
    book_columns = Book.column_names - ["created_at","deleted", "updated_at", "is_lent"]

    data.each do |row|
      book = Book.new
      errors = []
      warning = []
      header.each_with_index do |head,index|
        if book_columns.include?(head)
          book[head] = row[index]
        else
          errors << "#{head}:ヘッダーが正しくありません。"
        end
      end
      complement_by_api(book)
      if book.save
        load_image(book,warning)
        result << {title: book.title, id: book.id, status: "SUCCESS", errors: errors, warning: warning}
      else
        errors << book.errors.full_messages
        result << {title: book.title, id: nil, status: "FAILURE", errors: errors, warning: warning}
      end
    end
    render json: {process: "COMPLETE", result: result, success_count: result.count{|x|x[:status] == "SUCCESS"}, failure_count: result.count{|x|x[:status] == "FAILURE"}}
  end

  private

    def complement_by_api(book)
      if book.isbn.present? && book.isbn.ascii_only?
        res = JSON.parse(Net::HTTP.get(URI.parse(
          "https://www.googleapis.com/books/v1/volumes?q=isbn:#{book.isbn}"
        )),symbolize_names: true)
        if res[:totalItems] != 0
          book.title = res[:items][0][:volumeInfo][:title] if res[:items][0][:volumeInfo][:title] && book.title.blank?
          book.author = res[:items][0][:volumeInfo][:authors].join(",").to_s if res[:items][0][:volumeInfo][:authors] && book.author.blank?
          book.published_year = res[:items][0][:volumeInfo][:publishedDate].slice(0,4).to_s if res[:items][0][:volumeInfo][:publishedDate] && book.published_year.blank?
          book.description = res[:items][0][:volumeInfo][:description] if res[:items][0][:volumeInfo][:description] && book.description.blank?
          book.image_url = res[:items][0][:volumeInfo][:imageLinks][:thumbnail] if res[:items][0][:volumeInfo][:imageLinks] && book.image_url.blank?
        end
      end
    end

    def load_image(book,warning)
      valid_content = ['image/gif','image/png','image/jpg','image/jpeg','image/pjpeg','image/x-png']
      if book.image_url.present?
        url = book.image_url
        file = "./public/#{book.id}.jpg"
        URI.open(file, 'w') do |pass|
          URI.open(url) do |recieve|
            if recieve.respond_to?(:content_type) && valid_content.include?(recieve.content_type)
              pass.write(recieve.read.force_encoding(Encoding::UTF_8))
              book.image_url = file
            else
              warning << "書影ファイルの形式が不正です。"
            end
          end
        end
      else
        warning << "書影データがありません。"
      end
    end
end

class Review < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :rating, {numericality:{ greater_than: 0 }}

  scope :search_with_book_title, -> (title){
    return if title.blank?
    where(['title like ?',"%#{title}%"])
  }
end

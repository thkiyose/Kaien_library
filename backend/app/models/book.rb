class Book < ApplicationRecord
  belongs_to :category
  belongs_to :location

  validates :isbn, length: { minimum:10, maximum:13 }
  validates :title, presence: true, length: { maximum:255 }
  validates :author ,presence: true, length: { maximum:255 }
  validates :category_id, presence: true
  validates :published_year, presence: true, length: { minimum: 4, maximum: 4 }
  validates :description, presence: true
  validates :location, presence: true
  validates :version, length: { maximum: 3 }
end

class Book < ApplicationRecord
  belongs_to :category
  belongs_to :location
  mount_uploader :image_url, BookImageUploader

  validates :isbn, length: { minimum:10, maximum:13 }, allow_blank: true
  validates :title, presence: true, length: { maximum:255 }
  validates :author ,presence: true, length: { maximum:255 }
  validates :category_id, presence: true
  validates :published_year, presence: true, length: { minimum: 4, maximum: 4 }
  validates :description, presence: true
  validates :location_id, presence: true
  validates :version, length: { maximum: 2 }
end

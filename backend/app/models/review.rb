class Review < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :rating, {numericality:{ greater_than: 0 }}
end

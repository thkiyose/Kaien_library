class Category < ApplicationRecord
  has_many :books

  scope :search_with_id, -> (id){
    return if id.blank?
    where(id: id)
  }
  scope :search_with_category, -> (category){
    return if category.blank?
    where(['category like ?',"%#{category}%"])
  }
end

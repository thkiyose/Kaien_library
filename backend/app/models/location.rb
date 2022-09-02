class Location < ApplicationRecord
  has_many :books

  scope :search_with_id, -> (id){
    return if id.blank?
    where(id: id)
  }
  scope :search_with_location, -> (location){
    return if location.blank?
    where(['location like ?',"%#{location}%"])
  }
end

class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validate :start_end_check

  def start_end_check
    errors.add(:expiry_date, "日付が不正です。") unless
    self.start_date <= self.expiry_date
  end

  scope :show_expired, -> (show_flag){
    if show_flag == "true"
      all
    else show_flag == "false" || show_flag.blank?
      where('expiry_date > ?',Date.today)
    end
  }
  scope :search_with_book_title, -> (title){
    return if title.blank?
    where(['title like ?',"%#{title}%"])
  }

  scope :search_with_user_name, -> (name){
    return if name.blank?
    where(['name like ?',"%#{name}%"])
  }

  scope :search_with_user_email, -> (email){
    return if name.blank?
    where(['email like ?',"%#{email}%"])
  }

  scope :search_with_user_id, -> (id){
    return if id.blank?
    where(user_id: id)
  }

  scope :search_with_start_date, -> (startdate,enddate){
    return if startdate.blank? && enddate.blank?
    if startdate && enddate.blank?
      where('start_date >= ?',startdate)
    elsif startdate.blank? && enddate
      where('start_date <= ?',enddate)
    else
      where(start_date: startdate..enddate)
    end
  }

  scope :search_with_expiry_date, -> (startdate,enddate){
    return if startdate.blank? && enddate.blank?
    if startdate && enddate.blank?
      where('expiry_date >= ?',startdate)
    elsif startdate.blank? && enddate
      where('expiry_date <= ?',enddate)
    else
      where(expiry_date: startdate..enddate)
    end
  }
end

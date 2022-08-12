class Lending < ApplicationRecord
  belongs_to :user
  belongs_to :book
  validate :start_end_check
  before_destroy :restore_is_lent

  def start_end_check
    errors.add(:expiry_date, "日付が不正です。") unless
    self.start_date <= self.expiry_date
  end

  def restore_is_lent
    if self.finished_at == nil
      book = Book.find_by(id: self.book_id)
      book.update(is_lent: false)
    end
  end

  scope :show_finished, -> (show_flag){
    if show_flag == "true"
      all
    else show_flag == "false" || show_flag.blank?
      where(finished_at: nil)
    end
  }

  scope :search_with_book_title, -> (title){
    return if title.blank?
    where(['title like ?',"%#{title}%"])
  }
end

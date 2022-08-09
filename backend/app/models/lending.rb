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
    book = Book.find_by(id: self.book_id)
    book.update(is_lent: false)
  end

  scope :show_finished, -> (show_flag){
    return if show_flag.blank?
    if show_flag == "true"
      all
    else show_flag == "false"
      where(finished_at: nil)
    end
  }
end

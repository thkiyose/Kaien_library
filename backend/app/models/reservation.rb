class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validate :start_end_check

  def start_end_check
    errors.add(:expiry_date, "日付が不正です。") unless
    self.start_date <= self.expiry_date
  end
end

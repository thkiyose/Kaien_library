class User < ApplicationRecord
  has_secure_password
  before_validation :email_downcase

  validates :name, presence: true, length: { maximum: 15 }
  validates :email, presence: true, length: { maximum: 255}, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :admin, presence: true

  def email_downcase
    self.email.downcase!
  end
end

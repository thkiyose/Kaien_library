class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :validatable
  include DeviseTokenAuth::Concerns::User
  before_validation :email_downcase

  validates :name, presence: true, length: { maximum: 15 }

  private
  
  def email_downcase
    self.email.downcase!
  end
end

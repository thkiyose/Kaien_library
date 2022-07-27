class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :validatable
  include DeviseTokenAuth::Concerns::User
  before_validation :email_downcase
  before_destroy :ensure_admin

  has_many :lendings, dependent: :nullify
  has_many :reservations, dependent: :destroy
  has_many :books, through: :lendings
  has_many :watch_lists, dependent: :destroy
  has_many :watch_books, through: :watch_lists, source: :book
  has_many :reviews

  validates :name, presence: true, length: { maximum: 15 }

  private

  def email_downcase
    self.email.downcase!
  end

  def ensure_admin
    if self.admin == true && User.where(admin:true).count == 1
      throw :abort
    end
  end
end

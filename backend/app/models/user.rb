class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :validatable
  include DeviseTokenAuth::Concerns::User
  before_validation :email_downcase
  before_destroy :ensure_admin

  has_many :lendings, dependent: :nullify

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

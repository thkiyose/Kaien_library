require 'rails_helper'

RSpec.describe Lending, type: :model do
  before do
    Category.create(id:1, category:"文芸")
    Location.create(id:1, location:"1F本棚")
    @user = FactoryBot.create(:user)
    @book = FactoryBot.create(:book)
  end

  describe "Create lending" do
    it "is invalid without book id" do
      lending = @user.lendings.build(start_date: Date.today, expiry_date: (Date.today +1))
      expect(lending).not_to be_valid
    end
    it "is invalid when start date is before expiry date" do
      lending = @user.lendings.build(book_id: @book.id,start_date: Date.today, expiry_date: (Date.today - 10))
      expect(lending).not_to be_valid
    end
  end
end

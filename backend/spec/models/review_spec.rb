require 'rails_helper'

RSpec.describe Review, type: :model do
  before do
    Category.create(id:1, category:"文芸")
    Location.create(id:1, location:"1F本棚")
    @user = FactoryBot.create(:user)
    @book = FactoryBot.create(:book)
  end

  describe "Create Review" do
    it "is invalid when rating value is 0" do
      review = @user.reviews.build(book_id:@book.id, rating: 0, comment:"test")
      expect(review).not_to be_valid
    end
  end
end

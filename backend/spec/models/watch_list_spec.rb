require 'rails_helper'

RSpec.describe WatchList, type: :model do
  before do
    @user = FactoryBot.create(:user)
    Category.create(id:1, category:"文芸")
    Location.create(id:1, location:"1F本棚")
    @book = FactoryBot.create(:book)
  end
  describe "Add a book to watchlist" do
    it "raises db error with duplicated pairs of user and book" do
      list1 = WatchList.create(user_id:@user.id, book_id: @book.id)
      expect(list1).to be_valid
      expect do
        WatchList.create(user_id:@user.id, book_id: @book.id)
      end.to raise_error
    end
  end
end

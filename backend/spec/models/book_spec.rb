require 'rails_helper'

RSpec.describe Book, type: :model do
  describe "Book Registration" do
    it "is invalid with wrong number of digits of isbn  " do
      book = FactoryBot.build(:book, isbn:"000000000000000033330")
      expect(book).not_to be_valid
    end
  end
end

require 'rails_helper'

RSpec.describe Book, type: :model do
  before do
    Category.create(id:1,category:"文芸")
    Location.create(id:1, location:"1F本棚")
  end

  describe "Book Registration" do
    it "is invalid with wrong number of digits of isbn" do
      book1 = FactoryBot.build(:book, isbn:"0000")
      book2 = FactoryBot.build(:book, isbn:"000000000000000")
      expect(book1).not_to be_valid
      expect(book2).not_to be_valid
    end

    it "is invalid without a title" do
      book = FactoryBot.build(:book, title:"")
      expect(book).not_to be_valid
    end

    it "is invalid with a title that is too long" do
      book = FactoryBot.build(:book, title:"a" *256)
      expect(book).not_to be_valid
    end

    it "is invalid without an author name" do
      book = FactoryBot.build(:book, author:"")
      expect(book).not_to be_valid
    end

    it "is invalid with an author name that is too long" do
      book = FactoryBot.build(:book, author:"a" *256)
      expect(book).not_to be_valid
    end

    it "is invalid without a category id" do
      book = FactoryBot.build(:book, category_id:"")
      expect(book).not_to be_valid
    end

    it "is invalid with a published_year not 4 letters" do
      book1 = FactoryBot.build(:book, published_year:"123")
      book2 = FactoryBot.build(:book, published_year:"12345")
      expect(book1).not_to be_valid
      expect(book2).not_to be_valid
    end

    it "is invalid without a description" do
      book = FactoryBot.build(:book, description:"")
      expect(book).not_to be_valid
    end

    it "is invalid without a location id" do
      book = FactoryBot.build(:book, location_id:"")
      expect(book).not_to be_valid
    end


    it "is invalid without a version more than 3 digits" do
      book = FactoryBot.build(:book, version:"1234")
      expect(book).not_to be_valid
    end
  end
end

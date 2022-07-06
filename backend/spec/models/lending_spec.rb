require 'rails_helper'

RSpec.describe Lending, type: :model do
  before do
    Category.create(id:1,category:"文芸")
    Location.create(id:1, location:"1F本棚")
    book = FactoryBot.build(:book)
  end

  describe "Create lending" do
    it "is invalid with wrong number of digits of isbn" do
    end
  end
end

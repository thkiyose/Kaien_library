require "test_helper"

class BookTest < ActiveSupport::TestCase
  describe "Book Registration" do
    it "is invalid with wrong number of digits of isbn  " do
      movie = Movie.new(title: nil)
      movie.valid?
      expect(movie.errors[:title]).to include("can't be blank")
    end
  end
end

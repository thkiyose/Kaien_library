FactoryBot.define do
  factory :review do
    user { nil }
    book { nil }
    rating { 1.5 }
    comment { "MyText" }
  end
end

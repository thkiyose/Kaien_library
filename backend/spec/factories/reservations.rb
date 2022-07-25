FactoryBot.define do
  factory :reservation do
    user { nil }
    book { nil }
    start_date { "2022-07-13" }
    expiry_date { "2022-07-13" }
  end
end

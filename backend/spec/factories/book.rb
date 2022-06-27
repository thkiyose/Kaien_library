FactoryBot.define do
  factory :book do
    title { "test_title" }
    author { "test_author" }
    category_id { 1 }
    published_year { "2022" }
    description { "テストデータ" }
    location_id { 1 }
  end
end

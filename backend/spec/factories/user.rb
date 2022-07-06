FactoryBot.define do
  factory :user do
    name { "test_user" }
    email { "factory@f.co.jp" }
    password { "testpassword" }
  end
end

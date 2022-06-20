#カテゴリ用データ
Category.first_or_create(id:1, category:"文芸")

#場所用データ
Location.first_or_create(id:1, location:"1F本棚")

Book.create(
  title:"テスト",
  author:"夏目漱石",
  category_id:1,
  published_date:"2022-06-01",
  description:"テストデータ",
  location_id: 1
)

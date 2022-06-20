class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :isbn
      t.string :title
      t.string :author
      t.reference :category_id
      t.date :published_date
      t.text :description
      t.text :image_url
      t.reference :location_id
      t.integer :version
      t.boolean :deleted

      t.timestamps
    end
  end
end

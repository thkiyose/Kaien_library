class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :isbn
      t.string :title, null: false
      t.string :author, null: false
      t.references :category_id, null:false
      t.date :published_date, null:false
      t.text :description, null: false
      t.text :image_url
      t.references :location_id, null: false
      t.integer :version
      t.boolean :deleted, null:false, default: false

      t.timestamps
    end
  end
end

class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true
      t.float :rating, null: false
      t.text :comment

      t.timestamps
    end
    add_index :reviews, [:user_id, :book_id], unique: true
  end
end

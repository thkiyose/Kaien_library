class CreateWatchLists < ActiveRecord::Migration[6.1]
  def change
    create_table :watch_lists do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true
      t.timestamps
    end
    add_index :watch_lists, [:user_id, :book_id], unique: true
  end
end

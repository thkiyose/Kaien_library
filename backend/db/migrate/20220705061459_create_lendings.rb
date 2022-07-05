class CreateLendings < ActiveRecord::Migration[6.1]
  def change
    create_table :lendings do |t|
      t.references :user, null: false
      t.references :book, null: false
      t.date :start_date, null: false
      t.date :expiry_date, null:false
      t.date :finished_at

      t.timestamps
    end
  end
end

class AddNotNullOnLendings < ActiveRecord::Migration[6.1]
  def change
    change_column_null :lendings, :user_id, false
    change_column_null :lendings, :book_id, false
    change_column_null :lendings, :start_date,  false
    change_column_null :lendings, :expiry_date,  false
  end
end

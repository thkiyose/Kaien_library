class ChangeColumnToNull < ActiveRecord::Migration[6.1]
  def up
    change_column_null :reservations, :user_id, true
    change_column_null :reviews, :user_id, true
  end

  def down
    change_column_null :reservations, :user_id, false
    change_column_null :reviews, :user_id, false
  end
end

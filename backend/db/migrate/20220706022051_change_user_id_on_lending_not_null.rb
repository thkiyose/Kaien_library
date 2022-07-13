class ChangeUserIdOnLendingNotNull < ActiveRecord::Migration[6.1]
  def change
    change_column_null :lendings, :user_id, true
  end
end

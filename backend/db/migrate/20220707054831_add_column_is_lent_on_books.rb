class AddColumnIsLentOnBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :is_lent, :boolean, null:false, default: false
  end
end

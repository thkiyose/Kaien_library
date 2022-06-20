class RenameColumnCategoryAndLocation < ActiveRecord::Migration[6.1]
  def change
    rename_column :books, :category_id_id, :category_id
    rename_column :books, :location_id_id, :location_id
  end
end

class RenamePublishedDate < ActiveRecord::Migration[6.1]
  def change
        rename_column :books, :published_date, :published_year
  end
end

class ChangeColumnPublishedDate < ActiveRecord::Migration[6.1]
  def change
    change_column :books, :published_date, :string
  end
end

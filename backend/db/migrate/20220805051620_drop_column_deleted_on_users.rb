class DropColumnDeletedOnUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :deleted
  end
end

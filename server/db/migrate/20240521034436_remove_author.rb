class RemoveAuthor < ActiveRecord::Migration[7.1]
  def change
    drop_table :authors
  end
end

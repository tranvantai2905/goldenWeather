class AddIndexToWeather < ActiveRecord::Migration[7.1]
  def change
    add_index :weathers, [:location, :created_at]
  end
end

class CreateWeathers < ActiveRecord::Migration[7.1]
  def change
    create_table :weathers do |t|
      t.string :location
      t.float :temperature
      t.float :wind_speed
      t.float :humidity
      t.text :forecast

      t.timestamps
    end
  end
end

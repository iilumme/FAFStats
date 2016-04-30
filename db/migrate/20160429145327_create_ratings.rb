class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.string :player_id
      t.integer :rating
      t.integer :month

      t.timestamps null: false
    end
  end
end

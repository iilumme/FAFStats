class CreateStarRatings < ActiveRecord::Migration
  def change
    create_table :star_ratings do |t|
      t.string :game_id
      t.integer :stars
      t.integer :user_id

      t.timestamps null: false
    end
  end
end

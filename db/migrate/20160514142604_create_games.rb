class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :game_id
      t.integer :game_rating

      t.timestamps null: false
    end
  end
end

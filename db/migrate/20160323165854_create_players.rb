class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players, id:false do |t|
      t.integer :player_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end

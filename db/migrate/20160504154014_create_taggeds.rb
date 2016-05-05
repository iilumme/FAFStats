class CreateTaggeds < ActiveRecord::Migration
  def change
    create_table :taggeds do |t|
      t.integer :player_id
      t.integer :tag_id

      t.timestamps null: false
    end
  end
end

class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.string :style

      t.timestamps null: false
    end
  end
end

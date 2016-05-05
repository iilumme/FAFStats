class ChangeTaggedsPlayerIdToString < ActiveRecord::Migration
  def change
    change_column :taggeds, :player_id, :string
  end
end
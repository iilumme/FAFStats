class AddPlayerIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :player_id, :string
  end
end

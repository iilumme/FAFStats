class ChangePlayerIdToString < ActiveRecord::Migration
  def change
    change_column :users, :player_id, :string
  end
end

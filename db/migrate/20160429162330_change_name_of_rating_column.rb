class ChangeNameOfRatingColumn < ActiveRecord::Migration
  def change
    change_table :ratings do |t|
      t.rename :rating, :value
    end
  end
end

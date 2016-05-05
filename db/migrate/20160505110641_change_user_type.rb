class ChangeUserType < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.rename :type, :usertype
    end
  end
end

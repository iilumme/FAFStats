class DeleteUsernameAndPasswordFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :username, :string
    remove_column :users, :password_digest, :string
  end
end

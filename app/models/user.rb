class User < ActiveRecord::Base
  belongs_to :player, through: :player_id
  mount_uploader :image, ImageUploader
end

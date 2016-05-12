class User < ActiveRecord::Base
  belongs_to :player
  validates :player_id, uniqueness: true
  mount_uploader :image, ImageUploader
end

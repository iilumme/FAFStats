class User < ActiveRecord::Base
  belongs_to :player
  mount_uploader :image, ImageUploader
end

class User < ActiveRecord::Base
  mount_uploader :image, ImageUploader

  belongs_to :player
  validates :player_id, uniqueness: true

  has_many :comments
  has_many :star_ratings
end

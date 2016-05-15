class User < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  validates :player_id, uniqueness: true

  has_many :comments, dependent: :destroy
  has_many :star_ratings, dependent: :destroy

  def stars_of_a_game(game_id)
    return nil if star_ratings.find_by(:game_id => game_id).nil?
    star_ratings.find_by(:game_id => game_id).stars
  end
end

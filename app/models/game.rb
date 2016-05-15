class Game < ActiveRecord::Base
  has_many :star_ratings, :foreign_key => :game_id, :primary_key => :game_id, dependent: :destroy

  # Updates the game rating:
  # Every star given for the game is worth of certain amount of 'points'
  #   1 star => 1
  #   2 => 2
  #   3 => 4
  #   4 => 8
  #   5 => 16
  def fix_game_rating(old, new)
    if !old.nil?
      self.game_rating -= 2**(old-1)
    end
    self.game_rating += 2**(new-1)
    save
  end

  # Returns the average of all the star ratings
  def average_of_star_ratings
    return nil if star_ratings.size == 0
    star_ratings.average(:stars).to_int
  end

end

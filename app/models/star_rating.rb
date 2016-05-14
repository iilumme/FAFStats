class StarRating < ActiveRecord::Base
  belongs_to :user
  belongs_to :game, :foreign_key => :game_id, :primary_key => :game_id
end

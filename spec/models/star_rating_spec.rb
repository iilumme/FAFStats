require 'rails_helper'

RSpec.describe StarRating, type: :model do
  user = FactoryGirl.create(:user)
  game = FactoryGirl.create(:game)
  let(:star_rating){FactoryGirl.create(:star_rating, user: user, game: game) }

  it "has the user_id set correctly" do
    expect(star_rating.user_id).to eq(user.id)
  end

  it "has the game_id set correctly" do
    expect(star_rating.game_id).to eq(game.game_id)
  end

  it "has the stars set correctly" do
    expect(star_rating.stars).to eq(5)
  end

end
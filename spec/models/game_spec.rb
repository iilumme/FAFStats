require 'rails_helper'

RSpec.describe Game, type: :model do
  let(:game){FactoryGirl.create(:game) }

  it "has the game_id set correctly" do
    expect(game.game_id).to eq('44444444')
  end

  it "has the game rating set correctly" do
    expect(game.game_rating).to eq(16)
  end

  it "has method for fixing game_rating" do
    expect(game).to respond_to(:fix_game_rating)
  end

  it "has method for average of stars" do
    expect(game).to respond_to(:average_of_star_ratings)
  end

  describe 'method fix_game_rating' do

    it "increases game_rating when old value nil" do
      game.fix_game_rating(nil, 2)
      expect(game.game_rating).to eq(18)
    end

    it "decreases game rating when old value greater than new" do
      game.fix_game_rating(5, 2)
      expect(game.game_rating).to eq(2)
    end
  end

  describe 'method average_of_star_ratings' do

    it "without star ratings nil" do
      game2 = FactoryGirl.create(:game2)
      expect(game2.average_of_star_ratings).to eq(nil)
    end

    it "with one star ratings, star ratings value" do
      star_rating = FactoryGirl.create(:star_rating)
      expect(game.average_of_star_ratings).to eq(5)
    end
    it "with two star ratings" do
      star_rating = FactoryGirl.create(:star_rating)
      star_rating2 = FactoryGirl.create(:star_rating2)
      expect(game.average_of_star_ratings).to eq(4)
    end
  end
end
require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user){FactoryGirl.create(:user) }

  it "has the player_id set correctly" do
    expect(user.player_id).to eq("117602")
  end

  it "has the description set correctly" do
    expect(user.description).to eq("Bird lover")
  end

  describe 'star ratings of a game' do
    user = FactoryGirl.create(:user)
    game = FactoryGirl.create(:game)
    star_rating = FactoryGirl.create(:star_rating, user: user, game: game)

    it "has method for determining one" do
      expect(user).to respond_to(:stars_of_a_game)
    end

    it "without star ratings does not have one" do
      expect(user.stars_of_a_game('101010')).to eq(nil)
    end

    it "returns the right amount of stars" do
      expect(user.stars_of_a_game(game.game_id)).to eq(5)
    end
  end

end
require 'rails_helper'

RSpec.describe Comment, type: :model do

  user = FactoryGirl.create(:user)
  game = FactoryGirl.create(:game)
  comment = FactoryGirl.create(:comment, user: user, game: game)

  it "has the player_id set correctly" do
    expect(comment.player_id).to eq(user.player_id)
  end

  it "has the user_id set correctly" do
    expect(comment.user_id).to eq(user.id)
  end

  it "has the game_id set correctly" do
    expect(comment.game_id).to eq(game.game_id)
  end

  it "has the content set correctly" do
    expect(comment.content).to eq('Awesome win')
  end

end
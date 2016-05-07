require 'rails_helper'

RSpec.describe User, type: :model do
  it "has the player_id set correctly" do
    user = User.new player_id:"12345"

    expect(user.player_id).to eq("12345")
  end

  it "has the description set correctly" do
    user = User.new description:"I'm nice hyyppä. :)"

    expect(user.description).to eq("I'm nice hyyppä. :)")
  end

end
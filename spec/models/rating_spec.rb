require 'rails_helper'

RSpec.describe Rating, type: :model do

  it "has the player_id set correctly" do
    rating = Rating.new player_id:"12345"

    expect(rating.player_id).to eq("12345")
  end

  it "has the value set correctly" do
    rating = Rating.new value:2100

    expect(rating.value).to eq(2100)
  end

  it "has the month set correctly" do
    rating = Rating.new month:4

    expect(rating.month).to eq(4)
  end

end
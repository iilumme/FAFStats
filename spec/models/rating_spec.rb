require 'rails_helper'

RSpec.describe Rating, type: :model do
  let(:rating){FactoryGirl.create(:rating) }

  it "has the player_id set correctly" do
    expect(rating.player_id).to eq("117602")
  end

  it "has the value set correctly" do
    expect(rating.value).to eq(0)
  end

  it "has the month set correctly" do
    expect(rating.month).to eq(5)
  end

end
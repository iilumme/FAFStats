require 'rails_helper'

RSpec.describe Tagged, type: :model do
  tag = FactoryGirl.create(:tag)
  let(:tagged){FactoryGirl.create(:tagged, tag: tag) }

  it "has the player_id set correctly" do
    expect(tagged.player_id).to eq("117602")
  end

  it "has the tag_id set correctly" do
    expect(tagged.tag_id).to eq(tag.id)
  end

  it "has method for getting tags for player" do
    expect(Tagged).to respond_to(:get_tags_for_player)
  end

  describe 'method get_tags_for_player' do

    it "no tags returns nil" do
      expect(Tagged.get_tags_for_player('12')).to eq([])
    end

    it "returns correct tags" do
      tag2 = FactoryGirl.create(:tag)
      tagged.tag = tag2
      expect(Tagged.get_tags_for_player('117602').first.id).to eq(tag.id)
    end
  end

end
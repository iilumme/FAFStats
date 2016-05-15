require 'rails_helper'

RSpec.describe Tag, type: :model do
  let(:tag){FactoryGirl.create(:tag) }

  it "has the name set correctly" do
    expect(tag.name).to eq("FAF Stats administrator")
  end

  it "has the style set correctly" do
    expect(tag.style).to eq("orange")
  end
end
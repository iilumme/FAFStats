require 'rails_helper'

RSpec.describe "ratings/show", type: :view do
  before(:each) do
    @rating = assign(:rating, Rating.create!(
      :player_id => "Player",
      :rating => 1,
      :month => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Player/)
    expect(rendered).to match(/1/)
    expect(rendered).to match(/2/)
  end
end

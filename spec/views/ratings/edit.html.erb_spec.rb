require 'rails_helper'

RSpec.describe "ratings/edit", type: :view do
  before(:each) do
    @rating = assign(:rating, Rating.create!(
      :player_id => "MyString",
      :rating => 1,
      :month => 1
    ))
  end

  it "renders the edit rating form" do
    render

    assert_select "form[action=?][method=?]", rating_path(@rating), "post" do

      assert_select "input#rating_player_id[name=?]", "rating[player_id]"

      assert_select "input#rating_rating[name=?]", "rating[rating]"

      assert_select "input#rating_month[name=?]", "rating[month]"
    end
  end
end

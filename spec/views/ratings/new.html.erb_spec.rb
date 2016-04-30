require 'rails_helper'

RSpec.describe "ratings/new", type: :view do
  before(:each) do
    assign(:rating, Rating.new(
      :player_id => "MyString",
      :rating => 1,
      :month => 1
    ))
  end

  it "renders new rating form" do
    render

    assert_select "form[action=?][method=?]", ratings_path, "post" do

      assert_select "input#rating_player_id[name=?]", "rating[player_id]"

      assert_select "input#rating_rating[name=?]", "rating[rating]"

      assert_select "input#rating_month[name=?]", "rating[month]"
    end
  end
end

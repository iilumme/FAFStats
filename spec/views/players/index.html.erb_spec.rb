require 'rails_helper'

RSpec.describe "players/index", type: :view do
  before(:each) do
    assign(:players, [
      Player.create!(
        :id => "",
        :player_id => 1,
        :user_id => 2
      ),
      Player.create!(
        :id => "",
        :player_id => 1,
        :user_id => 2
      )
    ])
  end

  it "renders a list of players" do
    render
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end

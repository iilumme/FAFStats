require 'rails_helper'

RSpec.describe "players/new", type: :view do
  before(:each) do
    assign(:player, Player.new(
      :id => "",
      :player_id => 1,
      :user_id => 1
    ))
  end

  it "renders new player form" do
    render

    assert_select "form[action=?][method=?]", players_path, "post" do

      assert_select "input#player_id[name=?]", "player[id]"

      assert_select "input#player_player_id[name=?]", "player[player_id]"

      assert_select "input#player_user_id[name=?]", "player[user_id]"
    end
  end
end

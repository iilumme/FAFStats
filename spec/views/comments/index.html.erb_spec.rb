require 'rails_helper'

RSpec.describe "comments/index", type: :view do
  before(:each) do
    assign(:comments, [
      Comment.create!(
        :user_id => 1,
        :content => "MyText",
        :game_id => "Game"
      ),
      Comment.create!(
        :user_id => 1,
        :content => "MyText",
        :game_id => "Game"
      )
    ])
  end

  it "renders a list of comments" do
    render
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Game".to_s, :count => 2
  end
end

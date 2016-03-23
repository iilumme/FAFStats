require 'rails_helper'

RSpec.describe "users/index", type: :view do
  before(:each) do
    assign(:users, [
      User.create!(
        :description => "MyText",
        :player_id => 1,
        :image => "Image"
      ),
      User.create!(
        :description => "MyText",
        :player_id => 1,
        :image => "Image"
      )
    ])
  end

  it "renders a list of users" do
    render
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Image".to_s, :count => 2
  end
end

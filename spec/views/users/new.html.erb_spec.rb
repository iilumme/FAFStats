require 'rails_helper'

RSpec.describe "users/new", type: :view do
  before(:each) do
    assign(:user, User.new(
      :description => "MyText",
      :player_id => 1,
      :image => "MyString"
    ))
  end

  it "renders new user form" do
    render

    assert_select "form[action=?][method=?]", users_path, "post" do

      assert_select "textarea#user_description[name=?]", "user[description]"

      assert_select "input#user_player_id[name=?]", "user[player_id]"

      assert_select "input#user_image[name=?]", "user[image]"
    end
  end
end

require 'rails_helper'

RSpec.describe "users/edit", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :description => "MyText",
      :player_id => 1,
      :image => "MyString"
    ))
  end

  it "renders the edit user form" do
    render

    assert_select "form[action=?][method=?]", user_path(@user), "post" do

      assert_select "textarea#user_description[name=?]", "user[description]"

      assert_select "input#user_player_id[name=?]", "user[player_id]"

      assert_select "input#user_image[name=?]", "user[image]"
    end
  end
end

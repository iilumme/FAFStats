require 'rails_helper'

RSpec.describe "comments/new", type: :view do
  before(:each) do
    assign(:comment, Comment.new(
      :user_id => 1,
      :content => "MyText",
      :game_id => "MyString"
    ))
  end

  it "renders new comment form" do
    render

    assert_select "form[action=?][method=?]", comments_path, "post" do

      assert_select "input#comment_user_id[name=?]", "comment[user_id]"

      assert_select "textarea#comment_content[name=?]", "comment[content]"

      assert_select "input#comment_game_id[name=?]", "comment[game_id]"
    end
  end
end

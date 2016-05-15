require 'rails_helper'

RSpec.describe RatingsController do
  render_views

  describe "GET #player" do
    let(:rating){FactoryGirl.create(:rating) }
    it "renders the 'player' template" do
      get :player, id: rating.player_id, format: :json

      expect(response).to render_template("player")
      expect(response.code).to eql('200')
    end

    it "renders nothing" do
      get :player, id: '0', format: :json

      response.body.should be_blank
      expect(response.code).to eql('200')
    end
  end

end
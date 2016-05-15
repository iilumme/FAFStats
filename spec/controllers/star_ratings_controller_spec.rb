require 'rails_helper'

RSpec.describe StarRatingsController do
  render_views

  describe "GET #player " do
    let(:user){FactoryGirl.create(:user) }
    let(:game){FactoryGirl.create(:game) }
    let(:star_rating){FactoryGirl.create(:star_rating, user: user, game: game) }
    it "renders nothing coz current user not definided" do
      get :stars_of_current_user, id: game.game_id, format: :json

      expect(response.body).to eql('')
      expect(response.code).to eql('403')
    end
  end

  describe 'POST #create' do
    game = FactoryGirl.create(:game)
    star_rating = {stars: 3, game_id: game.game_id}

    it 'returns 403, no current user' do
      post :create, :star_rating => star_rating, format: :json
      expect(response.code).to eql('403')
    end
  end

end
require 'rails_helper'

RSpec.describe GamesController do
  render_views

  describe "GET #game " do
    let(:game){FactoryGirl.create(:game) }
    it "renders the 'game' template" do
      get :game, id: game.game_id, format: :json

      expect(response).to render_template("game")
      expect(response.code).to eql('200')
    end

    it "renders nothing" do
      get :game, id: '0', format: :json

      expect(response.body).to eql('')
      expect(response.code).to eql('200')
    end
  end

  describe 'GET #index' do
    let(:game){FactoryGirl.create(:game) }
    it "renders the 'index' template" do
      get :index, format: :json

      expect(response.body).not_to eql('[]')
      expect(response).to render_template("index")
      expect(response.code).to eql('200')
    end
  end
end
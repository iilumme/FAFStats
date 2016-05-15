require 'rails_helper'

RSpec.describe CommentsController do
  render_views

  describe "GET #game " do
    let(:user){FactoryGirl.create(:user) }
    let(:game){FactoryGirl.create(:game) }
    let(:comment){FactoryGirl.create(:comment, user: user, game: game) }
    it "renders the 'game' template" do
      get :game, id: game.game_id, format: :json

      expect(response).to render_template("game")
      expect(response.code).to eql('200')
    end

    it "renders nothing" do
      get :game, id: '0', format: :json

      expect(response.body).to eql('[]')
      expect(response.code).to eql('200')
    end
  end

  describe 'GET #index' do
    let(:user){FactoryGirl.create(:user) }
    let(:game){FactoryGirl.create(:game) }
    let(:comment){FactoryGirl.create(:comment, user: user, game: game) }
    it "renders the 'index' template" do
      get :index, format: :json

      expect(response.body).not_to eql('[]')
      expect(response).to render_template("index")
      expect(response.code).to eql('200')
    end
  end

  describe 'POST #create' do
    game = FactoryGirl.create(:game)
    comment = {content: 'haha', game_id: game.game_id}

    it 'returns 403, no current user' do
      post :create, :comment => comment, format: :json
      expect(response.code).to eql('403')
    end
  end

  describe 'POST #update' do
    let(:user){FactoryGirl.create(:user) }
    let(:game){FactoryGirl.create(:game) }
    let(:comment){FactoryGirl.create(:comment, user: user, game: game) }

    it 'returns 403, no current user' do
      post :update, id: comment.id, format: :json
      expect(response.code).to eql('403')
    end
  end

  describe 'DELETE #destroy' do
    let(:user){FactoryGirl.create(:user) }
    let(:game){FactoryGirl.create(:game) }
    let(:comment){FactoryGirl.create(:comment, user: user, game: game) }

    it 'returns 403, no current user' do
      delete :destroy, id: comment.id, format: :json
      expect(response.code).to eql('403')
    end
  end

end
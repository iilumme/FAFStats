require 'rails_helper'

RSpec.describe TaggedsController do
  render_views

  describe "GET #player " do
    let(:tag){FactoryGirl.create(:tag) }
    let(:tagged){FactoryGirl.create(:tagged, tag: tag) }
    it "renders the 'game' template" do
      get :player, id: tag.id, format: :json

      expect(response).to render_template("player")
      expect(response.code).to eql('200')
    end

    it "renders nothing" do
      get :player, id: '0', format: :json

      expect(response.body).to eql('[]')
      expect(response.code).to eql('200')
    end
  end

  describe 'GET #index' do
    let(:tag){FactoryGirl.create(:tag) }
    let(:tagged){FactoryGirl.create(:tagged, tag: tag) }
    it "renders the 'index' template" do
      get :index, format: :json

      expect(response).to render_template("index")
      expect(response.code).to eql('200')
    end
  end

  describe 'POST #create' do
    tag = FactoryGirl.create(:tag)
    tagged = {tag_id: tag.id, game_id: '44444444'}

    it 'returns 403, no current user' do
      post :create, :tagged => tagged, format: :json
      expect(response.code).to eql('403')
    end
  end

  describe 'DELETE #destroy' do
    let(:tag){FactoryGirl.create(:tag) }
    let(:tagged){FactoryGirl.create(:tagged, tag: tag) }

    it 'returns 403, no current user' do
      delete :destroy, id: tagged.id, format: :json
      expect(response.code).to eql('403')
    end
  end

end
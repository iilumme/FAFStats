require 'rails_helper'

RSpec.describe UsersController do
  render_views

  describe "GET #player " do
    let(:user){FactoryGirl.create(:user) }
    it "renders the 'player' template" do
      get :player, id: user.player_id, format: :json

      expect(response).to render_template("player")
      expect(response.code).to eql('200')
    end

    it "renders nothing" do
      get :player, id: '0', format: :json

      expect(response.body).to eql('')
      expect(response.code).to eql('200')
    end
  end

  describe 'GET #user' do
    let(:user){FactoryGirl.create(:user) }
    it "renders the 'user' template" do
      get :user, id: user.id, format: :json

      expect(response).to render_template("user")
      expect(response.code).to eql('200')
    end
  end

  describe 'POST #create' do
    user = {player_id: '117602'}

    it 'returns 200, valid user' do
      post :create, :user => user, format: :json
      expect(response.code).to eql('200')
    end

    it 'returns 400, not valid user' do
      post :create, :user => {player_id: 0}, format: :json
      expect(response.code).to eql('400')
    end
  end

end
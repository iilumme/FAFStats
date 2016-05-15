require 'rails_helper'

RSpec.describe TagsController do
  render_views


  describe 'GET #index' do
    let(:tag){FactoryGirl.create(:tag) }
    it "renders the 'index' template" do
      get :index, format: :json

      expect(response.body).not_to eql('[]')
      expect(response).to render_template("index")
      expect(response.code).to eql('200')
    end
  end


  describe 'POST #create' do
    tag = {name: 'haha', style: 'green'}

    it 'returns 403, no current_user' do
      post :create, :tag => tag, format: :json
      expect(response.code).to eql('403')
    end
  end

  describe 'POST #update' do
    let(:tag){FactoryGirl.create(:tag) }

    it 'returns 403, no current user' do
      put :update, id: tag.id, format: :json
      expect(response.code).to eql('403')
    end
  end

  describe 'DELETE #destroy' do
    let(:tag){FactoryGirl.create(:tag) }

    it 'returns 403, no current user' do
      delete :destroy, id: tag.id, format: :json
      expect(response.code).to eql('403')
    end
  end

end
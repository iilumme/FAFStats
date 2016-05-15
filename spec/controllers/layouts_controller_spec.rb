require 'rails_helper'

RSpec.describe LayoutsController do
  render_views

  describe 'GET #index' do
    it "renders the 'index' template" do
      get :index
      expect(response).to render_template("layouts/application")
      expect(response.code).to eql('200')
    end
  end

end
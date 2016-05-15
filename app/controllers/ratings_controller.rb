class RatingsController < ApplicationController

  # GET /ratings/player/*player_id*.json
  # Returns the 7 newest ratings
  def player
    @ratings = Rating.where('player_id = ?', params[:id]).limit(7).order('created_at DESC')
    @ratings = [@ratings] if @ratings.is_a?(Rating)
    render :player
  end
end

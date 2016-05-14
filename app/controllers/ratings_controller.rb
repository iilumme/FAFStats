class RatingsController < ApplicationController

  # GET /ratings/player/*player_id*.json
  # Returns the 7 newest ratings
  def player
    @ratings = Rating.where('player_id = ?', params[:id]).limit(7).order('created_at DESC')
    @ratings = [@ratings] if @ratings.is_a?(Rating)
    render :player
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def rating_params
      params.require(:rating).permit(:player_id, :value, :month)
    end
end

class StarRatingsController < ApplicationController

  def game
    @star_rating.average = StarRating.where('game_id = ?', params[:id]).average(:stars)
    star_rating = StarRating.find_by(:game_id => params[:id], :user_id => session[:user_id])

    if !session[:user_id].nil? or star_rating.nil?
      @star_rating.current_user_stars = nil
    else
      @star_rating.current_user_stars = star_rating.stars
    end
    render :game
  end

  # POST /star_ratings
  # POST /star_ratings.json
  def create

    if !session[:user_id].nil?

      star_rating = StarRating.find_by(:game_id => star_rating_params[:game_id], :user_id => session[:user_id])

      if star_rating.nil?
        @star_rating = StarRating.new(star_rating_params)
        @star_rating.user_id = session[:user_id]
      else
        @star_rating = star_rating
        @star_rating.stars = star_rating_params[:stars]
      end

      if @star_rating.save
        render :nothing => true, :status => :ok
      else
        render :nothing => true, :status => :unprocessable_entity
      end

    else
      render :nothing => true, :status => :bad_request
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_star_rating
      @star_rating = StarRating.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def star_rating_params
      params.require(:star_rating).permit(:game_id, :stars)
    end
end

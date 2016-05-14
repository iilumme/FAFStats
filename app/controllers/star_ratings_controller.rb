class StarRatingsController < ApplicationController



  def game
    ratings = StarRating.where('game_id = ?', params[:id])
    star_rating = StarRating.find_by(:game_id => params[:id], :user_id => session[:user_id])

    if ratings.average(:stars).nil?
      @game = {average_stars: 0, current_user_stars: 0}
      render :game
    elsif !ratings.nil?
      if session[:user_id].nil? or star_rating.nil?
        @game = {average_stars: ratings.average(:stars).to_int, current_user_stars: 0}
      else
        @game = {average_stars: ratings.average(:stars).to_int, current_user_stars: star_rating.stars}
      end
      render :game
    end
  end

  # POST /star_ratings
  # POST /star_ratings.json
  def create
    if !current_user.nil?

      # Let's check if there is already the game in Games db table
      game = Game.find_by_game_id(star_rating_params[:game_id])

      # If there wasn't game in db, let's add one and its game rating ( 2 ^ (star rating - 1) also
      if game.nil?
        game = Game.new(:game_id => star_rating_params[:game_id], :game_rating => 2**(star_rating_params[:stars]-1))
        game.save
        @star_rating = StarRating.new(star_rating_params)
        @star_rating.user_id = session[:user_id]
      else

        # Is there a previous star rating made by current user?
        star_rating = StarRating.find_by(:game_id => star_rating_params[:game_id], :user_id => current_user)

        # IF: There is NO previous star rating, let's add one and fix game's game rating
        #
        # ELSE: There is a previous star rating, let's update it and fix game's game rating
        if star_rating.nil?
          game.game_rating += 2**(star_rating_params[:stars]-1)
          game.save
          @star_rating = StarRating.new(star_rating_params)
          @star_rating.user_id = current_user
        else
          game.game_rating -= 2**(star_rating.stars-1)
          game.game_rating += 2**(star_rating_params[:stars]-1)
          game.save
          @star_rating = star_rating
          @star_rating.stars = star_rating_params[:stars]
        end
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

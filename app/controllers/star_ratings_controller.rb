class StarRatingsController < ApplicationController
  before_action :ensure_signed_in, only: [:stars_of_current_user, :create]

  # GET /star_ratings/current_user/*game_id*.json
  # Returns the stars given by current user
  def stars_of_current_user
    @current_user_stars = {stars: current_user.stars_of_a_game(params[:id])}
    render :stars_of_current_user
  end

  # POST /star_ratings.json
  # Creates and updates star ratings
  #   Also creates a new game if it does not exist already
  def create
    # Let's check if there is already the game in Games db table
    game = Game.find_by_game_id(star_rating_params[:game_id])

    # If there wasn't game in db, let's add one and its game rating ( 2 ^ (star rating - 1) also
    if game.nil?
      game = Game.new(:game_id => star_rating_params[:game_id], :game_rating => 2**(star_rating_params[:stars]-1))
      game.save
      @star_rating = StarRating.new(star_rating_params)
      @star_rating.user_id = current_user.id
    else

      # Is there a previous star rating made by current user?
      star_rating = StarRating.find_by(:game_id => star_rating_params[:game_id], :user_id => current_user.id)

      # IF: There is NO previous star rating, let's add one and fix game's game rating
      #
      # ELSE: There is a previous star rating, let's update it and fix game's game rating
      if star_rating.nil?
        game.fix_game_rating(nil, star_rating_params[:stars])
        @star_rating = StarRating.new(star_rating_params)
        @star_rating.user_id = current_user
      else
        game.fix_game_rating(star_rating.stars, star_rating_params[:stars])
        @star_rating = star_rating
        @star_rating.stars = star_rating_params[:stars]
      end
    end

    if @star_rating.save
      render :nothing => true, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end

  end

  private
  # Never trust parameters from the scary internet, only allow the white list through.
  def star_rating_params
    params.require(:star_rating).permit(:game_id, :stars)
  end
end

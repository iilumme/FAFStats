class GamesController < ApplicationController

  # GET /games/*game_id*.json
  # Returns the game found by game_id
  def game
    @game = Game.find_by_game_id(params[:id])
    render :nothing => true if @game.nil?
    render :game if !@game.nil?
  end

  # GET /games.json
  def index
    @games = Game.all
  end
end

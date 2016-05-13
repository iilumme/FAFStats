class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]


  # GET /users/player/*player_id*.json
  # Returns the user for the player if there is a user
  def player
    @user = User.find_by_player_id(params[:id])

    if @user.nil?
      #@user = User.new(:id => 0, :player_id => '0', :description => 'This player has not written a description.')
      render :nothing => true
    else
      render :player
    end

  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    @user.usertype = 2

    if @user.save
      render :nothing => true, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    @user.description = user_params[:description]
    @user.image = user_params[:image]

    if @user.save
      render :nothing => true, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:description, :player_id, :image)
    end
end

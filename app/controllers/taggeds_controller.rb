class TaggedsController < ApplicationController
  before_action :set_tagged, only: [:destroy]
  before_action :ensure_signed_in, :ensure_admin_or_moderator, only: [:create, :destroy]

  # GET taggeds/player/*player_id*.json
  # Returns the tags of the player
  def player
    @tags = Tagged.get_tags_for_player(params[:id])
    render :player
  end

  # GET /taggeds.json
  def index
    @taggeds = Tagged.all
  end

  # POST /taggeds
  # Returns HTTP status:
  #  200 (created new tagged)
  #  or 422 (couldn't process entity)
  #  or 400 (if tagged already exists)
  def create
    if !Tagged.find_by(:player_id => tagged_params[:player_id], :tag_id => tagged_params[:tag_id]).nil?
      render :nothing => true, :status => :bad_request
    else
      @tagged = Tagged.new(tagged_params)

      if @tagged.save
        render :nothing => true, :status => :ok
      else
        render :nothing => true, :status => :unprocessable_entity
      end
    end
  end

  # DELETE /taggeds/1
  def destroy
    @tagged.destroy
    render :nothing => true, :status => :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tagged
      @tagged = Tagged.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tagged_params
      params.require(:tagged).permit(:player_id, :tag_id)
    end
end

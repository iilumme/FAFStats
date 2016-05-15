class TaggedsController < ApplicationController
  before_action :set_tagged, only: [:show, :edit, :update, :destroy]


  def player
    @taggeds = Tagged.where('player_id = ?', params[:id])
    @tags = []
    @taggeds.each do |tagged|
      @tags.push Tag.find(tagged.tag_id)
    end
    render :player
  end

  # GET /taggeds
  # GET /taggeds.json
  def index
    @taggeds = Tagged.all
  end

  # POST /taggeds
  # POST /taggeds.json
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

  # PATCH/PUT /taggeds/1
  # PATCH/PUT /taggeds/1.json
  def update
    respond_to do |format|
      if @tagged.update(tagged_params)
        format.html { redirect_to @tagged, notice: 'Tagged was successfully updated.' }
        format.json { render :show, status: :ok, location: @tagged }
      else
        format.html { render :edit }
        format.json { render json: @tagged.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /taggeds/1
  # DELETE /taggeds/1.json
  def destroy
    @tagged.destroy
    respond_to do |format|
      format.html { redirect_to taggeds_url, notice: 'Tagged was successfully destroyed.' }
      format.json { head :no_content }
    end
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

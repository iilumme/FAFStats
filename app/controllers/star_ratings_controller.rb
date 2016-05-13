class StarRatingsController < ApplicationController
  before_action :set_star_rating, only: [:show, :edit, :update, :destroy]

  # GET /star_ratings
  # GET /star_ratings.json
  def index
    @star_ratings = StarRating.all
  end

  # GET /star_ratings/1
  # GET /star_ratings/1.json
  def show
  end

  # GET /star_ratings/new
  def new
    @star_rating = StarRating.new
  end

  # GET /star_ratings/1/edit
  def edit
  end

  # POST /star_ratings
  # POST /star_ratings.json
  def create
    @star_rating = StarRating.new(star_rating_params)

    respond_to do |format|
      if @star_rating.save
        format.html { redirect_to @star_rating, notice: 'Star rating was successfully created.' }
        format.json { render :show, status: :created, location: @star_rating }
      else
        format.html { render :new }
        format.json { render json: @star_rating.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /star_ratings/1
  # PATCH/PUT /star_ratings/1.json
  def update
    respond_to do |format|
      if @star_rating.update(star_rating_params)
        format.html { redirect_to @star_rating, notice: 'Star rating was successfully updated.' }
        format.json { render :show, status: :ok, location: @star_rating }
      else
        format.html { render :edit }
        format.json { render json: @star_rating.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /star_ratings/1
  # DELETE /star_ratings/1.json
  def destroy
    @star_rating.destroy
    respond_to do |format|
      format.html { redirect_to star_ratings_url, notice: 'Star rating was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_star_rating
      @star_rating = StarRating.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def star_rating_params
      params.require(:star_rating).permit(:game_id, :stars, :user_id)
    end
end

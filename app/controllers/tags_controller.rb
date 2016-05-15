class TagsController < ApplicationController
  before_action :set_tag, only: [:update, :destroy]
  before_action :ensure_signed_in, :ensure_admin_or_moderator,  only: [:create, :update, :destroy]

  # GET /tags.json
  # Returns all tags
  def index
    @tags = Tag.all
  end

  # POST /tags
  # Returns HTTP status:
  #  200 (created new tag)
  #  or 422 (couldn't process entity)
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render :nothing => true, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end
  end

  # PATCH/PUT /tags/1
  # PATCH/PUT /tags/1.json
  # Returns HTTP status:
  #  200 (updated the tag)
  #  or 422 (couldn't process entity)
  def update
    @tag.name = tag_params[:name]
    @tag.style = tag_params[:style]

    if @tag.save
      render :nothing => true, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end
  end

  # DELETE /tags/1
  # DELETE /tags/1.json
  # Returns HTTP status:
  #  204 (successfully deleted the tag)
  def destroy
    @tag.destroy
    render :nothing => true, :status => :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tag
      @tag = Tag.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tag_params
      params.require(:tag).permit(:name, :style)
    end
end

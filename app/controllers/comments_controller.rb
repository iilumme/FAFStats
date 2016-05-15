class CommentsController < ApplicationController
  before_action :set_comment, only: [:update, :destroy]
  before_action :ensure_signed_in, only: [:create, :update, :destroy]

  # GET /comments
  # Returns 50 newest comments
  def index
    @comments = Comment.all.order('created_at DESC').limit(50)
  end

  # GET /comments/*game_id*.json
  # Returns comments of the game in descending order
  def game
    @comments = Comment.where('game_id = ?', params[:id]).order('created_at DESC')
    @comments = [@comments] if @comments.is_a?(Comment)
    render :game
  end

  # POST /comments
  # Returns HTTP status:
  #  200 (created new comment)
  #  or 422 (couldn't process entity)
  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.player_id = current_user.player_id
    save_comment
  end

  # POST /comments/update
  #  200 (updated the comment)
  #  or 422 (couldn't process entity)
  #  or 400 (if there is not user in session
  #           or current user is not the creator of the comment)
  def update
    if @comment.user_id == current_user.id
      @comment.content = comment_params[:content]
      save_comment
    else
      render_bad_request
    end
  end

  # DELETE /comments/1
  # Returns HTTP status:
  #  204 (successfully deleted the comment)
  def destroy
    if @comment.user_id == current_user.id
      @comment.destroy
      render :nothing => true, :status => :no_content
    else
      render_bad_request
    end
  end

  private
  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:content, :game_id)
  end

  # Saves the comment:
  #  200 (updated the comment)
  #  or 422 (couldn't process entity)
  def save_comment
    if @comment.save
      render :nothing => true, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end
  end

  # Renders HTTP status 400 Bad Request
  def render_bad_request
    render :nothing => true, :status => :bad_request
  end
end

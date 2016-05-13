class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  def game
    @comments = Comment.where('game_id = ?', params[:id]).order('created_at DESC');
    @comments = [@comments] if @comments.is_a?(Comment)
    render :game
  end

  def create
    if !session[:user_id].nil?
      @comment = Comment.new(comment_params)
      @comment.user_id = session[:user_id]

      if @comment.save
        render :nothing => true, :status => :ok
      else
        render :nothing => true, :status => :unprocessable_entity
      end

    else
      render :nothing => true, :status => :bad_request
    end

  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:user_id, :content, :game_id)
    end
end

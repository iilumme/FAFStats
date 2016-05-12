class SessionsController < ApplicationController

  def create_oauth

    #raise request.env["omniauth.auth"].to_yaml

    user = User.find_by_player_id(env["omniauth.auth"].info.id)

    if user.nil?
      user = User.create
      user.player_id = env["omniauth.auth"].info.id
      user.usertype = 2
      user.save
      session[:user_id] = user.id

    elsif user && user.usertype != 3
      session[:user_id] = user.id

    elsif user.usertype == 3
      redirect_to :root
    end

  end

  def create
    @user = User.find_by player_id: params[:player_id]

    if @user
      session[:user_id] = @user.id
      render :sessionuser
    else
      render :nothing => true, :status => :unprocessable_entity
    end

  end

  def destroy
    session[:user_id] = nil
    render :nothing => true, :status => :ok
  end

  def current_logged_in_user
    @user = current_user

    if @user.nil?
      render json: ""
    else
      render :sessionuser
    end

  end

end

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

  def create_test_session
    session[:player_id] = "133636"
  end

  def destroy
    session[:user_id] = nil
    redirect_to :root
  end

  def current_logged_in_user
    @user = current_user

    if @user.nil?
      @user = User.new(:id => 0, :player_id => '0')
    end

    render :sessionuser
  end

end

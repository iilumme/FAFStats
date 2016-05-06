class SessionsController < ApplicationController

  def create_oauth

    #raise request.env["omniauth.auth"].to_yaml
    #user = User.find_by player_id: env["omniauth.auth"].info.joku_id

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

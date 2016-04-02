class SessionsController < ApplicationController

  def create_oauth
    raise request.env["omniauth.auth"].to_yaml
    #user = User.find_by player_id: env["omniauth.auth"].info.joku_id

  end

  def destroy
    session[:user_id] = nil
    redirect_to :root
  end

end

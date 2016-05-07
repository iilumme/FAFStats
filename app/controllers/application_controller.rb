class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @user = User.new(:id => 0, :player_id => '0')
    return @user

    # return nil if session[:user_id].nil?
    # @user = User.find(session[:user_id])
  end
end

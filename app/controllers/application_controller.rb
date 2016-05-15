class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  helper_method :current_user

  # Returns the user in session or nil
  def current_user
    return nil if session[:user_id].nil?
    @user = User.find(session[:user_id])
  end

  # Returns the usertype
  #   0 = administrator
  #   1 = moderator
  #   2 = normal
  #   3 = banned
  def ensure_usertype
    if current_user.usertype == 0
      'administrator'
    elsif current_user.usertype == 1
      'moderator'
    elsif current_user.usertype == 2
      'normal'
    elsif current_user.usertype == 3
      'banned'
    end
  end

  # Ensures that there is a user in session
  # Returns 403 if not
  def ensure_signed_in
    if current_user.nil?
      render :nothing => true, :status => :forbidden
    end
  end

  # Ensures that there is a administrator in session
  # Returns 403 if not
  def ensure_administrator
    if ensure_usertype == 'normal' or ensure_usertype == 'banned' or ensure_usertype == 'moderator'
      render :nothing => true, :status => :forbidden
    end
  end

  # Ensures that there is a moderator in session
  # Returns 403 if not
  def ensure_moderator
    if ensure_usertype == 'normal' or ensure_usertype == 'banned' or ensure_usertype == 'administrator'
      render :nothing => true, :status => :forbidden
    end
  end

  def ensure_admin_or_moderator
    if ensure_usertype == 'normal' or ensure_usertype == 'banned'
      render :nothing => true, :status => :forbidden
    end
  end

  def is_banned
    true if current_user.usertype == 3
  end

end

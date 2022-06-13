class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :check_xhr_header

  def login!
    session[:user_id] = @user.id
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  private

  def check_xhr_header
    return if request.xhr?

    render json: { error: 'forbidden' }, status: :forbidden
  end
end

module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  def authenticate_request!
    header = request.headers["Authorization"]
    return render_unauthorized unless header.present?
    token = header.split(" ").last
    decoded_token = JsonWebToken.decode(token)
    return render_unauthorized("Invalid token") unless decoded_token
    user_data = User.where(id: decoded_token[:user_id]).pluck(:id, :email).first
    @current_user = { id: user_data[0], email: user_data[1] } if user_data
    render_unauthorized("User not found") unless @current_user
  end

  def render_unauthorized(message = "Not Authorized")
    render_error(message, :unauthorized)
  end

  def current_user
    @current_user
  end

end

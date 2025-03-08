class Api::V1::AuthenticationController < ApplicationController
  include ActionController::Cookies
  skip_before_action :authenticate_request!
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      access_token = JsonWebToken.encode(user_id: user.id)
      refresh_token = SecureRandom.hex(64)
      user.update_column(:refresh_token, refresh_token)
      cookies[:refresh_token] = {
        value: refresh_token,
        expires: 7.days.from_now,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax
      }
      render_success({ access_token: access_token }, "You are successfully logged in")
    else
      render_error("Invalid email or password", 422)
    end
  rescue StandardError => ex
    render_error("#{ex.message}")
  end
  def signup
    user = User.new(user_params)
    if user.save
      render_success({ id: user.id, email: user.email }, "Registration has been successfully completed", :created)
    else
      render_error("Invalid email or password", 422)
    end
  rescue StandardError => ex
    render_error("#{ex.message}")
  end
  def refresh
    refresh_token = cookies[:refresh_token]
    user = User.find_by(refresh_token: refresh_token)
    if user
      new_access_token = JsonWebToken.encode(user_id: user.id)
      new_refresh_token = SecureRandom.hex(64)
      user.update_column(:refresh_token, new_refresh_token)
      cookies.signed[:refresh_token] = {
        value: new_refresh_token,
        expires: 7.days.from_now,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax
      }
      render_success({ access_token: new_access_token }, "Tokens refreshed successfully", :ok)
    else
      render_error("Invalid refresh token", 422)
    end
  rescue StandardError => ex
    render_error("#{ex.message}")
  end

  private
  def user_params
    params.require(:user).permit(
      :email, :password, :password_confirmation, :first_name, :last_name, :username,
      :age, :gender, :dob, :phone
    )
  end

end

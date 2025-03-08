module Renderable
  extend ActiveSupport::Concern
  def render_success(data = {}, message = nil, status = 200)
    render json: {
      data: data,
      message: message  ||= "Request has been successfully processed",
      success: true,
      error: false
    }, status: status
  end

  def render_error(message = nil, status = 500)
    return render json: {
      data: nil,
      message: message ||= "An error occurred.",
      success: false,
      error: true
    }, status: status
  end

end

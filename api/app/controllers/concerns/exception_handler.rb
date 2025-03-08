# app/controllers/concerns/exception_handler.rb
module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid
    rescue_from StandardError, with: :handle_standard_error
  end

  private

  def handle_record_not_found(ex)
    Rails.logger.error("Record not found: #{ex.message}\n#{ex.backtrace.join("\n")}")
     render_error("Record not found: #{ex.message}", :not_found)
  end

  def handle_record_invalid(ex)
    Rails.logger.error("Record invalid: #{ex.message}\n#{ex.backtrace.join("\n")}")
    render_error("Record invalid: #{ex.message}", :unprocessable_entity)
  end

  def handle_standard_error(ex)
    Rails.logger.error("Error occurred: #{ex.message}\n#{ex.backtrace.join("\n")}")
    error_message = Rails.env.production? ? "An unexpected error occurred" : ex.message
    render_error(error_message, :internal_server_error)
  end
end

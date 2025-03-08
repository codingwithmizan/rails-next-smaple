class ApplicationController < ActionController::API
  include Authenticable
  include Paginatable
  include Renderable
  include ExceptionHandler


  private

  def serialize_resource(resource, serializer)
    serialized_data = serializer.new(resource).serializable_hash[:data]
    serialized_data.is_a?(Array) ? serialized_data.map { |item| item[:attributes] } : serialized_data[:attributes]
  end

end


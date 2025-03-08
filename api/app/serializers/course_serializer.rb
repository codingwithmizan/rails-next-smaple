class CourseSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description, :status, :price, :duration

  attribute :price do |record|
    "#{record.price}$"
  end
  attribute :cover_photo_url do |record|
    if record.cover_photo.attached?
      Rails.application.routes.url_helpers.rails_blob_url(record.cover_photo, only_path: true)
    end
  end

end

class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :username, :age, :gender, :dob, :phone
  attribute :name do |record|
    "#{record.first_name} #{record.last_name}"
  end

end

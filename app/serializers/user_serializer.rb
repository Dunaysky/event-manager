# frozen_string_literal: true

class UserSerializer
  include JSONAPI::Serializer
  attributes :first_name, :last_name, :email
  attribute :full_name do |object|
    "#{object.first_name} #{object.last_name}"
  end
end

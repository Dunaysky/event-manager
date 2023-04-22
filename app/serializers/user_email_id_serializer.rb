# frozen_string_literal: true

class UserEmailIdSerializer
  include JSONAPI::Serializer
  attributes :id
  attribute :full_name do |object|
    "#{object.first_name} #{object.last_name}"
  end
end

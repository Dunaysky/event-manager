# frozen_string_literal: true

class UserEmailIdSerializer
  include JSONAPI::Serializer
  attributes :email, :id
end

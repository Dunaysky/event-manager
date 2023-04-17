# frozen_string_literal: true

class EventUserSerializer
  include JSONAPI::Serializer
  attributes :creator, :created_at
  attributes :user do |object|
    UserSerializer.new(object.user).serializable_hash
  end
end

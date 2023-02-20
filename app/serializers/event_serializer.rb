# frozen_string_literal: true

class EventSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description
  attribute :eventDate do |object|
    object.date.to_fs(:short)
  end 
end

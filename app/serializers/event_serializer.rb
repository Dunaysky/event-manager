# frozen_string_literal: true

class EventSerializer
  include JSONAPI::Serializer
  attributes :id
  attribute :eventTitle, &:title
  attribute :eventDate do |object|
    object.date.to_fs(:short)
  end
  attribute :eventDescription, &:description
end

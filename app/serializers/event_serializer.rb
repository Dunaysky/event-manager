# frozen_string_literal: true

class EventSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description
  attribute :event_date do |object|
    object.date.strftime('%F')
  end
  attribute :creator do |object, params|
    object.creator?(params[:current_user])
  end
  attributes :invited_users do |object|
    EventUserSerializer.new(object.event_users).serializable_hash
  end
end

# frozen_string_literal: true

class Event
  class Create
    def self.call(event_params)
      event = Event.new(event_params)
      event.event_users.where(user_id: event_params[:user_ids]).first.update(creator: true) if event.save
      event
    end
  end
end
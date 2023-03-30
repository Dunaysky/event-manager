# frozen_string_literal: true

class Event
  class Create
    def self.call(event_params, current_user)
      event = Event.new(event_params)
      event.event_users.find_by(user_id: current_user.id).update(creator: true) if event.save
      event
    end
  end
end

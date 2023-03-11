# frozen_string_literal: true

module Api
  module V1
    class EventsController < Api::V1::ApplicationController
      def index
        events = Event.all
        render json: EventSerializer.new(events)
      end

      def show
        render json: EventSerializer.new(event)
      end

      def create
        event = Event::Create.call(event_params.merge!(user_ids: [current_user.id]))

        if event.valid?
          render(json: 'Event was successfully created'.to_json, status: :created)
        else
          render(json: event.errors.full_messages, status: :unprocessable_entity)
        end
      end

      def update
        if event.update(event_params)
          if params[:user_ids]
            event_user_params = { event_id: event.id, user_id: params[:user_ids][0].to_i, creator: false }
            event_user = EventUser.new(event_user_params)
            if event_user.save
              render(json: 'User was added to event'.to_json, status: :ok)
            else
              render(json: 'User wasnt added to event'.to_json, status: :unprocessable_entity)
            end
            return
          end
          render(json: 'Event was successfully updated'.to_json, status: :ok)
        else
          render(json: 'Event wasnt updated'.to_json, status: :unprocessable_entity)
        end
      end

      def destroy
        event.delete
      end

      private

      def event_params
        params.require(:event).permit(:title, :description, :date, user_ids: [])
      end

      def event
        @event = Event.find(params[:id])
      end
    end
  end
end

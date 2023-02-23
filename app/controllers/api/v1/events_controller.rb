# frozen_string_literal: true

module Api
  module V1
    class EventsController < ApplicationController
      def index
        events = Event.all
        render json: EventSerializer.new(events)
      end

      def show
        render json: EventSerializer.new(event)
      end

      def create
        event = Event.new(event_params)

        if event.save
          render(json: 'Event was successfully created'.to_json, status: :created)
        else
          render(json: event.errors.full_messages, status: :unprocessable_entity)
        end
      end

      def update
        if event.update(event_params)
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

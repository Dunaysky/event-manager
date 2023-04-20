# frozen_string_literal: true

module Api
  module V1
    class EventsController < Api::V1::ApplicationController
      def index
        events = Event.all
        render json: EventSerializer.new(events, current_user_params)
      end

      def show
        render json: EventSerializer.new(event, current_user_params)
      end

      def create
        event = Event::Create.call(event_params, current_user)
        if event.valid?
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
        event.destroy
      end

      private

      def event_params
        all_params = params.require(:event).permit(:title, :description, :date, user_ids: [])
        all_params[:user_ids] = params[:user_ids] if params[:user_ids]
        all_params
      end

      def event
        @event = Event.find(params[:id])
      end

      def current_user_params
        { params: { current_user: current_user } }
      end
    end
  end
end

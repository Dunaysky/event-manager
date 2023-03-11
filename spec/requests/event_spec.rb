# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Event' do
  let!(:user) { create(:user) }

  before do
    sign_in user
  end

  describe 'POST /api/v1/events' do
    let(:event_params) do
      {
        event: {
          title: 'Morning meeting',
          description: 'Meeting on current project',
          date: Date.tomorrow
        }
      }
    end
    let(:invalid_params) do
      {
        event: {
          title: 'Morning meeting',
          description: 'Meeting on current project'
        }
      }
    end

    context 'when create events without errors' do
      it 'creates event record' do
        expect do
          post '/api/v1/events', params: event_params
        end.to change(Event, :count).by(1)
           .and change(EventUser, :count).by(1)
      end

      it 'returns "created" status' do
        post '/api/v1/events', params: event_params

        expect(response).to have_http_status(:created)
      end

      it 'returns informative message' do
        post '/api/v1/events', params: event_params

        expect(json).to eq('Event was successfully created')
      end
    end

    context 'when create events with errors' do
      it 'Do not create event without date' do
        expect do
          post '/api/v1/events', params: invalid_params
        end.not_to change(Event, :count)
      end

      it 'returns "unprocessable_entity" status' do
        post '/api/v1/events', params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET /enents/:event_id' do
    let!(:event) { create(:event) }

    it 'returns json representation of the event' do
      get "/api/v1/events/#{event.id}"

      expect(json.dig('data', 'attributes', 'title'))
        .to eq(event.title)
      expect(json.dig('data', 'attributes', 'eventDate'))
        .to eq(event.date.to_fs(:short))
      expect(json.dig('data', 'attributes', 'description'))
        .to eq(event.description)
    end

    it 'returns appropriate status' do
      get "/api/v1/events/#{event.id}"

      expect(response).to have_http_status(:ok)
    end

    it 'handles id that is out of range' do
      get '/api/v1/events/1000000'

      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'GET /events' do
    let!(:number_of_events) { 2 }
    let!(:events) { create_list(:event, number_of_events) }
    let!(:first_event) { events.first }
    let(:description_path) { %w[attributes description] }
    let(:title_path) { %w[attributes title] }
    let(:date_path) { %w[attributes eventDate] }
    let(:event_to_compare) do
      json['data'].find do |event|
        event['id'].to_i == first_event.id
      end
    end

    it 'returns more than one event' do
      get '/api/v1/events'
      expect(response).to have_http_status(:ok)
      expect(json['data']&.count).to eq(number_of_events)
    end

    it 'returns properly serialized events' do
      get '/api/v1/events'

      expect(event_to_compare.dig(*description_path))
        .to eq(first_event.description)
      expect(event_to_compare.dig(*title_path))
        .to eq(first_event.title)
      expect(event_to_compare.dig(*date_path))
        .to eq(first_event.date.to_fs(:short))
    end
  end

  describe 'PUT /events/:event_id' do
    let(:event) do
      create(:event,
             title: 'Original title',
             description: 'Original description',
             date: Date.tomorrow,
             user_ids: [user.id])
    end
    let(:updated_title) { 'Updated title' }
    let(:updated_description) { 'Updated description' }
    let(:updated_date) { Date.tomorrow + 2 }
    let(:updated_event_params) do
      {
        event: {
          title: updated_title,
          description: updated_description,
          date: updated_date
        }
      }
    end
    let(:another_user) { create(:user) }
    let(:another_user_params) { updated_event_params.merge!(user_ids: [another_user.id]) }

    it 'updates given properties' do
      expect do
        put "/api/v1/events/#{event.id}", params: updated_event_params
        event.reload
      end.to change(event, :title).to(updated_title)
         .and change(event, :description).to(updated_description)
         .and change(event, :date).to(updated_date)
    end

    it 'returns appropriate status' do
      put "/api/v1/events/#{event.id}", params: updated_event_params

      expect(response).to have_http_status(:ok)
    end

    it 'Adding user to event' do
      expect do
        put "/api/v1/events/#{event.id}", params: another_user_params
      end.to change(EventUser, :count).by(2)
    end
  end

  describe 'DELETE /events/:event_id' do
    let(:title) { 'Original title' }
    let(:description) { 'Original description' }
    let(:date) { Date.tomorrow }
    let(:event) { create(:event, title: title, description: description, date: date) }

    it 'deletes given event' do
      delete "/api/v1/events/#{event.id}"

      expect { event.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(response).to have_http_status(:no_content)
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User' do
  let!(:user) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:user3) { create(:user) }

  before do
    sign_in user
  end

  describe 'GET /api/v1/users' do
    it 'returns json representation of second user' do
      get '/api/v1/users'
      expect(json.dig('data', 0, 'attributes', 'first_name'))
        .to eq(user2.first_name)
      expect(json.dig('data', 0, 'attributes', 'last_name'))
        .to eq(user2.last_name)
      expect(json.dig('data', 0, 'attributes', 'email'))
        .to eq(user2.email)
    end

    it 'returns json representation of third user' do
      get '/api/v1/users'
      expect(json.dig('data', 1, 'attributes', 'first_name'))
        .to eq(user3.first_name)
      expect(json.dig('data', 1, 'attributes', 'last_name'))
        .to eq(user3.last_name)
      expect(json.dig('data', 1, 'attributes', 'email'))
        .to eq(user3.email)
    end

    it 'returns appropriate status' do
      get '/api/v1/users'
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /api/v1/users/:user_id/current_user_details' do
    it 'returns json representation of current user' do
      get "/api/v1/users/#{user.id}/current_user_details"
      expect(json.dig('data', 'attributes', 'first_name'))
        .to eq(user.first_name)
      expect(json.dig('data', 'attributes', 'last_name'))
        .to eq(user.last_name)
      expect(json.dig('data', 'attributes', 'email'))
        .to eq(user.email)
    end

    it 'returns appropriate status' do
      get "/api/v1/users/#{user.id}/current_user_details"
      expect(response).to have_http_status(:ok)
    end
  end
end

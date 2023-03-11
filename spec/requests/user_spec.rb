# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User' do
  let!(:user) { create(:user) }

  before do
    sign_in user
  end

  describe 'GET /api/v1/users' do
    it 'returns json representation of current_user' do
      get '/api/v1/users'
      expect(json.dig('data', 'attributes', 'first_name'))
        .to eq(user.first_name)
      expect(json.dig('data', 'attributes', 'last_name'))
        .to eq(user.last_name)
      expect(json.dig('data', 'attributes', 'email'))
        .to eq(user.email)
    end

    it 'returns appropriate status' do
      get '/api/v1/users'
      expect(response).to have_http_status(:ok)
    end
  end
end

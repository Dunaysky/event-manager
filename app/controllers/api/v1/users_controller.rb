# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      def index
        render json: UserSerializer.new(current_user)
      end
    end
  end
end

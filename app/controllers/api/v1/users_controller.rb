# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      def index
        users = User.where.not(id: current_user.id)
        render json: UserSerializer.new(users)
      end

      def current_user_details
        render json: UserSerializer.new(current_user)
      end
    end
  end
end

# frozen_string_literal: true

module Api
  module V1
    class ApplicationController < ApplicationController
      before_action :authenticate_user!
      rescue_from ActiveRecord::RecordNotFound, with: :not_found

      private

      def not_found
        render json: 'Not Found', status: :not_found
      end
    end
  end
end

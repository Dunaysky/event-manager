# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def not_found
    render json: 'Not Found', status: :not_found
  end
end

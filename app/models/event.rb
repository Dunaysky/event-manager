# frozen_string_literal: true

class Event < ApplicationRecord
  has_many :event_users, dependent: :destroy
  validates :title, :date, presence: true
end

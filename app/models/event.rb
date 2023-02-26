# frozen_string_literal: true

class Event < ApplicationRecord
  has_many :event_users, dependent: :destroy
  has_many :users, through: :event_users
  validates :title, :date, presence: true
end

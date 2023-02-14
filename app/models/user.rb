# frozen_string_literal: true

class User < ApplicationRecord
  has_many :event_users, dependent: :destroy
  validates :email, uniqueness: true, presence: true, email: true
  validates :first_name, presence: true
end

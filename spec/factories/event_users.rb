# frozen_string_literal: true

FactoryBot.define do
  factory :event_user do
    event
    user
    creator { true }
  end
end

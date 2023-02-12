# frozen_string_literal: true

FactoryBot.define do
  factory :event_user do
    event_id { Faker::Number.within(range: 1..10) }
    user_id { Faker::Number.within(range: 1..10) }
    creator { true }
  end
end

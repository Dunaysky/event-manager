# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    title { Faker::TvShows::Friends.character }
    description { Faker::TvShows::Friends.quote }
    date { Faker::Time.forward(days: 10) }
  end
end

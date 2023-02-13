# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Event do
  context 'when have many event_users' do
    it { is_expected.to have_many(:event_users) }
  end

  context 'when has a valid factory' do
    it { expect(create(:event)).to be_valid }
  end

  context 'when validate presence' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:date) }
  end
end
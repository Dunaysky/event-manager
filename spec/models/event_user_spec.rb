# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EventUser do
  context 'when belong to user and event' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:event) }
  end

  context 'has a valid factory' do
    it { expect(create(:event_user)).to be_valid }
  end
end

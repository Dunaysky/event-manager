# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EventUser do
  let!(:user) { create(:user) }
  let!(:event) { create(:event) }

  context 'when belong to user and event' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:event) }
  end

  context 'when has a valid factory' do
    it {
      expect(create(:event_user,
                    user_id: user.id,
                    event_id: event.id)).to be_valid
    }
  end
end

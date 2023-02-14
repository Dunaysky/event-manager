# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  context 'has many event_users' do
    it { is_expected.to have_many(:event_users) }
  end

  context 'has a valid factory' do
    it { expect(create(:user)).to be_valid }
  end

  context 'when validate presence' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:first_name) }
  end

  context 'if e-mail is unique and valid' do
    it { is_expected.to validate_uniqueness_of(:email) }
    it { expect(build(:user, email: 'invalid')).not_to be_valid }
  end
end

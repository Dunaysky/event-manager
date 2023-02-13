# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  let(:invalid_email) do
    described_class.create(email: 'invalid',
                           first_name: 'Name1',
                           last_name: 'Name2')
  end

  context 'when have many event_users' do
    it { is_expected.to have_many(:event_users) }
  end

  context 'when has a valid factory' do
    it { expect(create(:user)).to be_valid }
  end

  context 'when validate presence' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:first_name) }
  end

  context 'if e-mail is unique and valid' do
    it { is_expected.to validate_uniqueness_of(:email) }
    it { expect(invalid_email).not_to be_valid }
  end
end

# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :event_users, dependent: :destroy
  has_many :events, through: :event_users
  validates :email, uniqueness: true, presence: true
  validates :first_name, :encrypted_password, presence: true
end

Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/account', to: 'account#current_account'
  get '/events/new', to: 'events#new'

  namespace :api do
    namespace :v1 do
      resources :events, only: %i[index create show update destroy]
      resources :users, only: %i[index] do
        get :current_user_details
        get :users_email_id
      end
    end
  end

  root to: "home_page#index"
end

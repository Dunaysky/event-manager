Rails.application.routes.draw do
  devise_for :users #, controllers: { sessions: 'users/sessions' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/account', to: 'account#current_account'
  resources :events, only: %i[show new edit]

  namespace :api do
    namespace :v1 do
      resources :events, only: %i[index create show update destroy]
      resources :users, only: %i[index] do
        get :current_user_details
        get :users_name_id
      end
    end
  end

  root to: "home_page#index"
end

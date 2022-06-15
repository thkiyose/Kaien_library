Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/show'
    end
  end
  get 'users/show'
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks], controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      resources :users, except: [:create,:index]

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end

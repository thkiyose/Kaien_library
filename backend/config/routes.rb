Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks], controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      resources :users, except: [:create,:index] do
        post 'check_email_unique', on: :collection
      end
      resources :books, only: [:index, :create, :show] do
        patch 'delete_book', on: :member
        post 'fetch_book_info', on: :collection
        get 'fetch_categories', on: :collection
        get 'fetch_locations', on: :collection
        post 'search', on: :collection
      end
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end

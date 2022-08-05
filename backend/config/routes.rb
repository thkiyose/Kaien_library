Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'lendings/create'
    end
  end
  get 'lendings/create'
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks], controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      resources :users, except: [:create,:index] do
        post 'check_email_unique', on: :collection
      end
      resources :books, only: [:index, :create, :show] do
        get 'index_for_admin', on: :collection
        post 'fetch_book_info', on: :collection
        get 'fetch_categories', on: :collection
        get 'fetch_locations', on: :collection
        post 'search', on: :collection
      end
      resources :watch_lists, only: [:index, :create, :destroy] do
        get 'is_watching', on: :collection
      end
      resources :lendings, only: [:show,:create] do
        get 'show_previous', on: :member
        get 'fetch_lending', on: :member
        post 'create_from_reservation', on: :collection
        post 'is_current_user_lending', on: :collection
        patch 'return', on: :member
      end
      resources :reservations, only: [:create, :destroy] do
        get 'fetch_lendings_and_reservations', on: :member
        get 'fetch_current_user_reservation', on: :member
      end
      resources :reviews, only: [:create,:destroy,:update,:index] do
        get 'user_reviews', on: :collection
      end
      namespace :admin do
        resources :books, only: [:index,:destroy] do
          get "search", on: :collection
        end
        get 'user_index'
        post 'search_books'
      end
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end

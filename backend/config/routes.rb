Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :sessions, only: [:new,:create,:destroy] do
    collection do
      get "/logged_in", to: "sessions#logged_in?"
    end
  end
end

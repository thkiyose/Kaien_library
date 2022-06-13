Rails.application.routes.draw do
  resources :users
  resources :sessions, only: [:new,:create,:destroy] do
    collection do
      get "/logged_in", to: "sessions#logged_in?"
    end
  end
end

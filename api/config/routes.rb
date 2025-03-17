Rails.application.routes.draw do
  resources :posts

  namespace :api do
    namespace :v1 do
      post "login", to: "authentication#login"
      post "signup", to: "authentication#signup"
      get "refresh", to: "authentication#refresh"
      resources :users
      resources :employees
      resources :products
      resources :courses
    end
  end

end

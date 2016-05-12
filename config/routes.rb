Rails.application.routes.draw do

  post 'register' => 'users#create'
  post 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'
  get 'sessions/current_user' => 'sessions#current_logged_in_user'

  resources :taggeds
  get 'taggeds/player/:id' => 'taggeds#player'

  resources :tags
  resources :ratings
  get 'ratings/player/:id' => 'ratings#player'

  resources :players
  resources :users
  get 'users/player/:id' => 'users#player'

  root :to => 'layouts#index'
  get '*path' => 'layouts#index'


  get '/auth/:provider/callback' => "sessions#create_oauth"

end

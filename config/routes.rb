Rails.application.routes.draw do

  # StarRatings
  get 'star_ratings/:id' => 'star_ratings#game'
  post 'star_ratings' => 'star_ratings#create'

  # Comments
  get 'comments/:id' => 'comments#game'
  post 'comments' => 'comments#create'

  # Tags
  resources :tags                                         #!!!!

  # Taggeds
  get 'taggeds/player/:id' => 'taggeds#player'
  resources :taggeds                                      #!!!!

  # Users
  get 'users/player/:id' => 'users#player'
  post 'register' => 'users#create'
  post 'users/update' => 'users#update'
  resources :users

  # Sessions
  get 'sessions/current_user' => 'sessions#current_logged_in_user'
  get 'logout' => 'sessions#destroy'
  post 'login' => 'sessions#create'
  get '/auth/:provider/callback' => "sessions#create_oauth"

  # Ratings
  get 'ratings/player/:id' => 'ratings#player'
  resources :ratings                                      #!!!!


  resources :players

  root :to => 'layouts#index'
  get '*path' => 'layouts#index'

end

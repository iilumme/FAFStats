Rails.application.routes.draw do

  # Games
  get 'games/:id', to: 'games#game'
  get 'games', to: 'games#index'

  # StarRatings
  get 'star_ratings/:id', to: 'star_ratings#game'
  get 'star_ratings/current_user/:id', to: 'star_ratings#stars_of_current_user'
  post 'star_ratings' , to: 'star_ratings#create'

  # Comments
  get 'comments' , to: 'comments#index'
  get 'comments/:id' , to: 'comments#game'
  post 'comments' , to: 'comments#create'
  post 'comments/update' , to: 'comments#update'

  # Tags
  resources :tags                                         #!!!!

  # Taggeds
  get 'taggeds/player/:id' , to: 'taggeds#player'
  resources :taggeds                                      #!!!!

  # Users
  get 'users/player/:id', to: 'users#player'
  get 'users/:id', to: 'users#user'
  post 'register' , to: 'users#create'
  post 'users/update' , to: 'users#update'
  resources :users

  # Sessions
  get 'sessions/current_user' , to: 'sessions#current_logged_in_user'
  get 'logout' , to: 'sessions#destroy'
  post 'login' , to: 'sessions#create'


  #########################
  get 'auth/:provider/callback', to: 'sessions#create_oauth'
  #########################

  # Ratings
  get 'ratings/player/:id' , to: 'ratings#player'
  resources :ratings                                      #!!!!


  resources :players

  root 'layouts#index'
  get '*path' , to: 'layouts#index'

end

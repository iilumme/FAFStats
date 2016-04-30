Rails.application.routes.draw do

  resources :ratings
  get 'ratings/player/:id' => 'ratings#player'

  resources :players
  resources :users

  root :to => 'layouts#index'
  get '*path' => 'layouts#index'

  #get '/auth/:provider/callback' => "sessions#create_oauth"

end

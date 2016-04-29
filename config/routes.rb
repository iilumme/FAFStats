Rails.application.routes.draw do
  resources :players
  resources :users

  root :to => 'layouts#index'
  get '*path' => 'layouts#index'

  #get '/auth/:provider/callback' => "sessions#create_oauth"

end

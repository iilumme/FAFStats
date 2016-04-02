require 'omniauth/faf_oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :faf, ENV['CLIENT_ID'], ENV['CLIENT_SECRET']
end
require 'omniauth-oauth2'

module OmniAuth
  module Strategies
    class Faf < OmniAuth::Strategies::OAuth2
      option :name, 'faf'

      option :client_options, {
          site: 'http://api.faforever.com',
          authorize_url: 'http://api.faforever.com/oauth/authorize'
      }

      def request_phase
        super
      end

      def authorize_params
        super.tap do |params|
          %w[scope client_options].each do |v|
            if request.params[v]
              params[v.to_sym] = request.params[v]
            end
          end
        end
      end

      # uid{ raw_info['id'] }
      #
      # info do
      #   {
      #       # :name => raw_info['name'],
      #       # :email => raw_info['email']
      #   }
      # end

      # extra do
      #   { raw_info: raw_info }
      # end

      # def raw_info
      #   #@raw_info ||= access_token.get('/user').parsed
      # end
    end
  end
end
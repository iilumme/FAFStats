class RatingsGetter

  @queue = :ratings

  def self.perform
    url = "http://api.faforever.com/ranked1v1"
    players = JSON.parse(HTTParty.get "#{url}")['data']

    players.map do | player |
      params = {:player_id => player['attributes']['id'], :value => player['attributes']['rating'], :month => Time.now.month}
      rating = Rating.new(params)
      rating.save
    end
  end
end
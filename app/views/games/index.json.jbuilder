json.array!(@games) do |game|
  json.extract! game, :id, :game_id, :game_rating
  json.url game_url(game, format: :json)
end

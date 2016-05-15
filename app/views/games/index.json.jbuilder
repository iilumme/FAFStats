json.array!(@games) do |game|
  json.extract! game, :id, :game_id, :game_rating
end

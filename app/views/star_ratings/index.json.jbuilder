json.array!(@star_ratings) do |star_rating|
  json.extract! star_rating, :id, :game_id, :stars, :user_id
  json.url star_rating_url(star_rating, format: :json)
end

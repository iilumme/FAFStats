json.array!(@ratings) do |rating|
  json.extract! rating, :id, :player_id, :rating, :month
  json.url rating_url(rating, format: :json)
end

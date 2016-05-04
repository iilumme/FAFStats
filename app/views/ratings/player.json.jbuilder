json.array!(@ratings) do |rating|
  json.extract! rating, :player_id, :value, :month
  json.url rating_url(rating, format: :json)
end

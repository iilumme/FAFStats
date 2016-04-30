json.array!(@ratings) do |rating|
  json.extract! rating, :value
  json.url rating_url(rating, format: :json)
end

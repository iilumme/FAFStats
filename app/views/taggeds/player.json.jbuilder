json.array!(@tags) do |tag|
  json.extract! tag, :id, :name, :style
  json.url tagged_url(tag, format: :json)
end

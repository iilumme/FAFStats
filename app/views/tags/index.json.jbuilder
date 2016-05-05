json.array!(@tags) do |tag|
  json.extract! tag, :id, :name, :style
  json.url tag_url(tag, format: :json)
end

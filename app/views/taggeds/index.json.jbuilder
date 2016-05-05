json.array!(@taggeds) do |tagged|
  json.extract! tagged, :id, :player_id, :tag_id
  json.url tagged_url(tagged, format: :json)
end

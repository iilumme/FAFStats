json.array!(@users) do |user|
  json.extract! user, :id, :description, :player_id, :image
  json.url user_url(user, format: :json)
end

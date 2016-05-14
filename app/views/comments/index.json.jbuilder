json.array!(@comments) do |comment|
  json.extract! comment, :id, :user_id, :content, :game_id
end

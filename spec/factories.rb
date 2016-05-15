FactoryGirl.define do

  factory :user do
    player_id '117602'
    description 'Bird lover'
    usertype 2
  end

  factory :comment do
    user
    player_id '117602'
    content 'Awesome win'
    game
  end

  factory :game do
    game_id '44444444'
    game_rating 16
  end

  factory :game2, class: Game do
    game_id '44444445'
    game_rating 0
  end

  factory :rating do
    player_id '117602'
    value 0
    month 5
  end

  factory :star_rating do
    game
    stars 5
    user
  end

  factory :star_rating2, class: StarRating do
    game
    stars 3
    user
  end

  factory :tag do
    name 'FAF Stats administrator'
    style 'orange'
  end

  factory :tagged do
    player_id '117602'
    tag
  end

end


# FactoryGirl.define do
#
#   factory :user do
#     player_id '117602'
#     description 'Bird lover'
#     usertype 2
#   end
#
#   factory :comment do
#     user 1
#     player_id '117602'
#     content 'Awesome win'
#     game_id '44444444'
#   end
#
#   factory :game do
#     game_id '44444444'
#     game_rating 16
#   end
#
#   factory :game2, class: Game do
#     game_id '44444445'
#     game_rating 0
#   end
#
#   factory :rating do
#     player_id '117602'
#     value 0
#     month 5
#   end
#
#   factory :star_rating do
#     game_id '44444444'
#     stars 5
#     user_id 1
#   end
#
#   factory :star_rating2, class: StarRating do
#     game_id '44444444'
#     stars 3
#     user_id 2
#   end
#
#   factory :tag do
#     name 'FAF Stats administrator'
#     style 'orange'
#   end
#
#   factory :tagged do
#     player_id '117602'
#     tag_id 1
#   end
#
# end

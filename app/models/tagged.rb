class Tagged < ActiveRecord::Base
  belongs_to :tag

  def self.get_tags_for_player(player_id)
    @taggeds = Tagged.where('player_id = ?', player_id)
    @tags = []
    @taggeds.each do |tagged|
      @tags.push tagged.tag
    end
    return @tags
  end
end

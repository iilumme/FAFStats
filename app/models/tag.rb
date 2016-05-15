class Tag < ActiveRecord::Base
  has_many :taggeds, dependent: :destroy

end

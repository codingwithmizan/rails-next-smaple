class Post < ApplicationRecord
  validates :title, presence: true

  enum :status, %i[ pending published archived ]
end

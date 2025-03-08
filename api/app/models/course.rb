class Course < ApplicationRecord
  has_many :enrollments
  has_many :users, through: :enrollments
  has_one_attached :cover_photo

  enum :status, [ :pending, :active, :cancelled ]

end

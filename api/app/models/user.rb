class User < ApplicationRecord
  has_secure_password
  validates :username, presence: { message: "Username can't be blank." },
            uniqueness: { message: "Username has already been taken." }
  validates :email, presence: { message: "Email can't be blank" },
            uniqueness: { message: "Email has already been taken." }
  validates :password, presence: { message: "Password can't be blank." },
            length: { minimum: 6, message: "Password must be at least 6 characters." }
  validates :password_confirmation, presence: { message: "Password confirmation can't be blank." }
  validate :passwords_match

  has_many :enrollments
  has_many :courses, through: :enrollments

  private
  def passwords_match
    if password.present? && password_confirmation.present? && password != password_confirmation
      errors.add(:password_confirmation, "Passwords do not match.")
    end
  end
end

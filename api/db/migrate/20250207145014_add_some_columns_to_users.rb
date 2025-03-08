class AddSomeColumnsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :username, :string
    add_column :users, :age, :integer
    add_column :users, :gender, :string
    add_column :users, :dob, :datetime
  end
end

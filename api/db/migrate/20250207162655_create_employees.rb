class CreateEmployees < ActiveRecord::Migration[8.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :email
      t.string :designation
      t.integer :age
      t.datetime :dob

      t.timestamps
    end
  end
end

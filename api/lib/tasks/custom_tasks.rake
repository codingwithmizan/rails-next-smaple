# namespace :custom do
#   desc "print a simple message"
#   task hello: :environment do
#     puts "Hello, Rails task"
#   end
# end


# namespace :custom do
#   desc "Prints a personalizes greetings"
#   task :greet, [ :name ] => :environment do |t, args|
#     name = args[:name] || "Guest"
#     puts "Hello #{name}"
#   end
# end

# namespace :users do
#   desc "list all users"
#   task list: :environment do
#     User.all.each do |user|
#       puts "#{user.id}: #{user.username} (#{user.email})"
#     end
#   end
# end


namespace :users do
  desc "Create a new user"
  task :create, [ :name, :email ] => :environment do |t, args|
    user = User.create(name: args[:name], email: args[:email], password: "password123")
    if user.persisted?
      puts "User #{user.name} created successfully"
    else
      puts "Failed to created user: #{user.errors.full_messages.join(", ")}"
    end
  end
end

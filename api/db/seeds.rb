# users = User.create([
#                       {
#                         email: "rakhi@gmail.com",
#                         password: "123456",
#                         password_confirmation: "123456",
#                         first_name: "arifa",
#                         last_name: "rakhi",
#                         username: "arifa_rakhi",
#                         age: 29,
#                         gender: "female",
#                         dob: "1999-01-01",
#                         phone: "1234567890"
#                       },
#                       {
#                         email: "hasan@gmail.com",
#                         password: "123456",
#                         password_confirmation: "123456",
#                         first_name: "ali",
#                         last_name: "hasan",
#                         username: "ali_hasan",
#                         age: 32,
#                         gender: "male",
#                         dob: "1999-01-01",
#                         phone: "1234567890"
#                       },
#                       {
#                         email: "manik@gmail.com",
#                         password: "123456",
#                         password_confirmation: "123456",
#                         first_name: "mehedi",
#                         last_name: "manik",
#                         username: "mehedi_manik",
#                         age: 35,
#                         gender: "male",
#                         dob: "1999-01-01",
#                         phone: "1234567890"
#                       },
#                       {
#                         email: "hello@gmail.com",
#                         password: "123456",
#                         password_confirmation: "123456",
#                         first_name: "hello",
#                         last_name: "world",
#                         username: "hello_world",
#                         age: 25,
#                         gender: "male",
#                         dob: "1999-01-01",
#                         phone: "1234567890"
#                       },
#                       {
#                         email: "sadia@gmail.com",
#                         password: "123456",
#                         password_confirmation: "123456",
#                         first_name: "sadia",
#                         last_name: "islam",
#                         username: "sadia_islam",
#                         age: 20,
#                         gender: "female",
#                         dob: "1997-01-01",
#                         phone: "1234567890"
#                       }
#                     ])

courses = Course.create([
                          {
                            title: "react bootcamp",
                            description: Faker::Lorem.paragraph(sentence_count: 3),
                            status: 0,
                            price: 12.59,
                            duration: 3
                          },
                          {
                            title: "python bootcamp",
                            description: Faker::Lorem.paragraph(sentence_count: 3),
                            status: 1,
                            price: 12.59,
                            duration: 6
                          },
                          {
                            title: "javascript bootcamp",
                            description: Faker::Lorem.paragraph(sentence_count: 3),
                            status: 0,
                            price: 10.59,
                            duration: 3
                          },
                          {
                            title: "typescript bootcamp",
                            description: Faker::Lorem.paragraph(sentence_count: 3),
                            status: 0,
                            price: 13.11,
                            duration: 3
                          },
                          {
                            title: "Next bootcamp",
                            description: Faker::Lorem.paragraph(sentence_count: 3),
                            status: 0,
                            price: 20.59,
                            duration: 5
                          },
                          {
                            title: "ruby on rails bootcamp",
                            description: Faker::Lorem.paragraph(sentence_count: 3),
                            status: 0,
                            price: 12.59,
                            duration: 6
                          }
                        ])

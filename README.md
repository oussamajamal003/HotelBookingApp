A Hotel Booking web app where users can book hotels.
Users can also signup as hotel partner to list their hotel rooms and manage the hotel bookings from the admin panel.

Backend part: 
First I setup mysql connection, nodemon, .gitignore then the environment variables .env but only .env.example published
I depend on clean folder structure:

a main file server.js where i use api/users a filter path just for user and auth routes
db.js in config folder for mysql connection
user routes in routes folder   
controllers folder for logic and middleware functions
For each api i add the route then contoller ...
In users-controllers i implement:
a get func to get all users
a signup func to add a new user 
a login func to log an existing user

For auth : i use bcrypt for having hashed passwords in db and jwt for tokens

signup func: it insert new users with bcrypt to secure user password and make sure it is hashed in db

login func: it find user by email with bcrypt to compare password (entered in postman in our case) with the hashedpassword stored in mysql
then JWT jsonwebtoken will be generated only AFTER password is correct, if password is correct the token is sent

The next step i will implement apis for rooms/booking and hotel and then start with frontend
railway live link: https://hotelbookingapp-production-f292.up.railway.app/

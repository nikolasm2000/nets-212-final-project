# nets-212-final-project

Hey all!

We are: 
Henrique Lorente: hlorente
Nikolas Mihailidis: mnikolas
Pranav Aurora: pranava
Rafael Marques: rmarques

This is Group 17's version of PennBooks. This was created using node and express for the backend, dynamodb for the database, and react for the front end.

This will be run on an EC2 instance. 

We are quite proud of some of our extra-credit features we have implemented including:
- Friends request system for adding/removing friends
- users can post pictures, and also set their own profile pictures 
- seemless transitions on the frontend between routes
- Notification system when recieving friend request, new accepted friend, chat invite, runs synchronously without refresh.
- Friend reccomendation component recomemnding new friends to a user through shared affiliation

We have also managed to implement the required features including facebook style newsfeed, chat, and article recommendation on the newsfeed. (Full list includes user registration, posts, likes, comments, walls, friends, etc.)

A full list of frontend source files can be found in nets212/src, which contains all components and frontend routes used.

Backend source files can be found in nets212/api, where all backend functions and routes can be found.

All of the code has been written by us.

To run the application
- backend, cd into api, and run node api.js
- frontend, cd into nets212, and run npm start for the React front end. 
(please also run npm install to download all the required packages we have used)

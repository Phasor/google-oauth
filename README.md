Following https://www.makeuseof.com/nodejs-google-authentication/

Simple express app secured using JWTs and Google OAuth.

You can only access the /profile route once you have authenticated with Google OAuth and received a JWT which needs to be sent in the Authorization header of the request to /profile.
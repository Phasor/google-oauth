const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
require('dotenv').config();


module.exports = (passport) => {
    // Google Strategy
    passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/google/callback",
        passReqToCallback : true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'google.id': profile.id });
            // if user exists return the user 
            if (existingUser) {
                return done(null, existingUser);
        }
        // if user does not exist create a new user 
        console.log('Creating new user...');
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
    ));

    // JWT Strategy
    passport.use(new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: "secretKey",
        },
        async (jwtPayload, done) => {
            try {
                const user = jwtPayload.user;   
                done(null, user); 
            } catch (error) {
                done(error, false);
            }
        }
     ));

}
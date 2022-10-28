// https://www.makeuseof.com/nodejs-google-authentication/
// trying to follow the above tutorial
const express = require('express');
const passport = require("passport");
require("./passportConfig")(passport);
require('dotenv').config();
require('./db');
const jwt = require("jsonwebtoken")

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Redirect the user to the Google signin page 
app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// // Retrieve user data using the access token received 
// app.get("/auth/google/callback", passport.authenticate('google', { session: false }),
//     (req, res) => {
//         res.redirect("/profile/");
// });

app.get("/auth/google/callback", passport.authenticate('google', { session: false }),
    (req, res) => {
        jwt.sign(
            { user: req.user },
            "secretKey",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return res.json({token: null, error: err});
                }
                res.json({token: token});
            }
        );
    }
);


// // profile route after successful sign in
// app.get("/profile", (req, res) => { 
//     console.log(req);
//     res.send("Welcome");
// });

app.get("/profile", passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send("Welcome");
    }
);

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

module.exports = app;
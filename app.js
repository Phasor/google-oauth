const express = require('express');
const passport = require("passport");
require("./passportConfig")(passport);
require('dotenv').config();
const cors = require('cors');
require('./db');
const jwt = require("jsonwebtoken")
var path = require('path');

const app = express();

//set middleware
app.use(express.json());  // Instead of using body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // allows our front end application to make HTTP requests to Express application

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Redirect the user to the Google signin page 
app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// Retrieve user data using the access token received 
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
                //res.json({token: token});
                res.redirect(`http://localhost:3000/home?token=${token}`);
            }
        );
    }
);

app.get("/secret", passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.json({ success: true, msg: 'pixie' });
    }
);

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

module.exports = app;
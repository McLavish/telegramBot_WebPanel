const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const indexRouter = require('./routes');
const authRouter = require('./routes/auth.routes');

const app = express();
mongoose.connect(process.env.MONGODB_CNN, {useNewUrlParser: true});

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.json()
);

app.use( session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

app.use('/public', express.static(__dirname + "/public"));

app.use(indexRouter);
app.use(authRouter);

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log('asd');
});
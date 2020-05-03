const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const config = require('../../config');
const oAuthFunction = require('./oauth_function');

const passportConfig = {
    clientID: config.get('authentication.google.clientId'),
    clientSecret: config.get('authentication.google.clientSecret'),
    callbackURL: 'http://localhost:3000/auth/google/callback'
};

passport.use(new passportGoogle.OAuth2Strategy(passportConfig, oAuthFunction));
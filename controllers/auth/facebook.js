const passport = require('passport');
const passportFacebook = require('passport-facebook');
const config = require('../../config');
const oAuthFunction = require('./oauth_function');

const passportConfig = {
    clientID: config.get('authentication.facebook.clientId'),
    clientSecret: config.get('authentication.facebook.clientSecret'),
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
};

if (passportConfig.clientID) {
    passport.use(new passportFacebook.Strategy(passportConfig, oAuthFunction));
}
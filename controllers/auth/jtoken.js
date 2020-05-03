const passport = require('passport');
const passportJwt = require('passport-jwt');
const config = require('../../config');
const PanelUser = require('../../models/panel_user');
const ObjectId = require('mongoose').Types.ObjectId;

const jwtOptions = {
    // Get the JWT from the "Authorization" header.
    // By default this looks for a "JWT " prefix
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    // The secret that was used to sign the JWT
    secretOrKey: config.get('authentication.token.secret'),
    // The issuer stored in the JWT
    issuer: config.get('authentication.token.issuer'),
    // The audience stored in the JWT
    audience: config.get('authentication.token.audience')
};

//payload is an object literal containing the decoded payload
passport.use('jwt',new passportJwt.Strategy(jwtOptions, async (payload, done) => {

    const user = await PanelUser.findOne({ _id: new ObjectId(payload.sub.toString()) }).exec();

    if (user) {
        //Pass only the mongodb document
        return done(null, user._doc, payload);
    }
    return done();
}));
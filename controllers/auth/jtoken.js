const passport = require('passport');
const passportJwt = require('passport-jwt');
const config = require('../../config');
const PanelUser = require('../../models/panel_user');
const ObjectId = require('mongoose').Types.ObjectId;

//funzione per estrarre i cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

const jwtOptions = {
    // Get the JWT from the "Authorization" header.
    // By default this looks for a "JWT " prefix
    //Non uso questa funzione perchè dovrei usare le fetch che mettono gli header ogni volta a TUTTE le chiamate HTTP, i cookie fanno tutto loro invece
    //jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),

    //Ho deciso di usare i cookie automatici che semplificano la vita
    jwtFromRequest: cookieExtractor,
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

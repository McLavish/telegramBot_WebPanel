const passport = require('passport');
const localStrategy = require('passport-local');
const PanelUser = require('../../models/panel_user');

//LA CRITTOGRAFIA è GESTITA NEL MODEL USERPANEL

const registerPassportConfig = {
    usernameField: 'inputEmail',
    passwordField: 'inputPassword',
    passReqToCallback: true
};

passport.use('register', new localStrategy.Strategy(registerPassportConfig, async (req, username, password, done) => {
        let user = new PanelUser({
            email: username,
            password: password,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            creation_date: Math.floor(Date.now() / 1000)
        });
        await user.save();
        return done(null, user);
}));

const loginPassportConfig = {
    usernameField: 'inputEmail',
    passwordField: 'inputPassword',
    passReqToCallback: false
};

passport.use('login', new localStrategy.Strategy(loginPassportConfig, async ( username, password, done) => {
    const user = await PanelUser.findOne({email: username}).exec();

    if (!user)
        return done(null, false,  {message: 'No user with given email'});

    const validate = await user.checkPassword(password);

    if (!validate) {
        return done(null, false, {message: 'Passwords do not match'});
    }

    return done(null, user, {message: 'Login successful'});
}));

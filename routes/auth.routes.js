const express = require('express');
const passport = require('passport');
const router = new express.Router();
const generateAccessToken = require('../controllers/token_generation');

function generateUserToken(req, res) {
    const accessToken = generateAccessToken(req.user._id);

    //MANDO IL COOKIE COSì FA TUTTO IN AUTMATICO YEEEEEE
    res.cookie('jwt', accessToken);

    res.render('auth/authenticated');
}

router.get('/auth/register', (req, res) => {
    res.render('auth/register');
});
//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/auth/register', passport.authenticate('register', {session: false, failureRedirect: '/auth/register'} ), async (req, res) => {
    res.render('auth/registered');
});


router.get('/auth/login', (req, res) => {
    res.render('auth/login');
});
//Sarebbe stato bello usare {failureFlash: true} MA SONO BUGGATI E NON APPAIONO
/*
PER OVVIARE AL FLASH CHE NON APPARE DOVREI FARNE UNO IO USANDO UNA CUSTOM CALLBACK
  app.get('/auth/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    cose da fare
  })(req, res, next);
});
*/
router.post('/auth/login',
    passport.authenticate('login', {session: false, failureRedirect: '/auth/login'}), generateUserToken);


router.get('/auth/google',
    passport.authenticate('google', {session: false, scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', {session: false, failureRedirect: '/'}), generateUserToken);

router.get('/auth/facebook',
    passport.authenticate('facebook', {session: false, scope: ['email'] }));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {session: false, failureRedirect: '/'}), generateUserToken);

module.exports = router;

const jwt = require('jsonwebtoken');
const config = require('../config');

// Generate an Access Token for the given User ID
function generateAccessToken(userId) {
    // How long will the token be valid for
    const expiresIn = config.get('authentication.token.expiry');
    // Which service issued the token
    const issuer = config.get('authentication.token.issuer');
    // Which service is the token intended for
    const audience = config.get('authentication.token.audience');
    // The signing key for signing the token
    const secret = config.get('authentication.token.secret');

    const token = jwt.sign({}, secret, {
        //Advanced security: add an UUID field to allow revocation of tokens
        expiresIn: expiresIn,
        audience: audience,
        issuer: issuer,
        subject: userId.toString()
    });

    return token;
}

module.exports = generateAccessToken;
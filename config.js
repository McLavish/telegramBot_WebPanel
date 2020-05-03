const convict = require('convict');
//const dotenv = require("dotenv");

const config = convict({
    http: {
        port: {
            doc: 'The port to listen on',
            default: 3000,
            env: 'PORT'
        }
    },
    authentication: {
        google: {
            clientId: {
                doc: "The Client ID from Google to use for authentication",
                default: "",
                env: "GOOGLE_CLIENT_ID"
            },
            clientSecret: {
                doc: "The Client Secret from Google to use for authentication",
                default: "",
                env: "GOOGLE_CLIENT_SECRET"
            }
        },
        facebook: {
            clientId: {
                doc: "The Client ID from Facebook to use for authentication",
                default: "",
                env: "FACEBOOK_APP_ID"
            },
            clientSecret: {
                doc: "The Client Secret from Facebook to use for authentication",
                default: "",
                env: "FACEBOOK_APP_SECRET"
            }
        },
        token: {
            secret: {
                doc: 'The signing key for the JWT',
                default: 'mySuperSecretKey',
                env: "JWT_SIGNING_KEY"
            },
            issuer: {
                doc: 'The issuer for the JWT',
                default: 'telegram-bot'
            },
            audience: {
                doc: 'The audience for the JWT',
                default: 'telegram-bot'
            },
            expiry: {
                doc: 'The expiry of the JWT',
                default: '1 hour'
            }
        }
    }
});

config.validate();

module.exports = config;

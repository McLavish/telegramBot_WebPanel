const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes');
const authRouter = require('./routes/auth.routes');
const secureRouter = require('./routes/secure');

require("./controllers/auth/local");
require("./controllers/auth/jtoken");
require("./controllers/auth/google");
require("./controllers/auth/facebook");

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

//Uso i cookie così il client non deve fare nulla (Diventa impossibile gestire il localstorage/sessionstorage). Uso il mio programma come se fosse normale solo che posso accedere alle route sicure
app.use(cookieParser());
app.use(passport.initialize());

app.use('/public', express.static(__dirname + "/public"));

app.use(indexRouter);
app.use(authRouter);
app.use(passport.authenticate('jwt', {session: false}), secureRouter);

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log('asd');
});
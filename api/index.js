const express = require('express');

const chalk = require('chalk');
const session = require('express-session');
const passport = require('./config/passport');
const bodyParser = require('body-parser');
const cookieParser = 'cookie-parser';
const users from './api/routes/users';
const app = express();


app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', users);

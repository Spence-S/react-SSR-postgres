import 'babel-polyfill';
import express from 'express';
import render from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import logger from 'morgan';
import proxy from 'express-http-proxy';
import chalk from 'chalk';
import session from 'express-session';
import passport from './config/passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import users from './api/routes/users';

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

app.get('*', async (req, res) => {
  const Store = createStore();
  const promises = matchRoutes(Routes, req.path).map(
    ({ route }) => (route.loadData ? route.loadData(Store) : null)
  );
  const renderer = () => {
    const context = {};
    const content = render(req, Store, context);
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  };
  try {
    await Promise.all(promises);
    renderer();
  } catch (err) {
    renderer();
  }
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log(chalk.bgGreen(chalk.gray('Listening on 3000')));
});

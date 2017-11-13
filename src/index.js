import 'babel-polyfill';
import express from 'express';
import render from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import logger from 'morgan';
import proxy from 'express-http-proxy';
import sequelize from './db';
import Users from './api/models/Users';
import chalk from 'chalk';

const app = express();

sequelize
  .authenticate({
    logging: false // don't log query
  })
  .then(() =>
    console.log(chalk.blueBright('Connection to DB established successssss'))
  )
  .catch(err => console.error('No DB connections', err));

app.use(logger('dev'));
app.use(express.static('public'));

app.get('*', async (req, res) => {
  const Store = createStore();
  const promises = matchRoutes(Routes, req.path).map(
    ({ route }) => (route.loadData ? route.loadData(Store) : null)
  );
  await Promise.all(promises);
  res.send(render(req, Store));
});

app.listen(3000, () => {
  console.log(chalk.bgGreen(chalk.gray('Listening on 3000')));
});

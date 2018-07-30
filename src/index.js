import 'babel-polyfill';
import express from 'express';
import render from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import logger from 'morgan';
import proxy from 'express-http-proxy';

const app = express();

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

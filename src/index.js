import 'babel-polyfill';
import express from 'express';
import render from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
  const Store = createStore();
  res.send(render(req, Store));
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});

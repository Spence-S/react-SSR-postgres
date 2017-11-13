// Startup point for client side app!
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Routes from './Routes';
import State from './reducers';
import { renderRoutes } from 'react-router-config';

const Store = createStore(State, window.__initialState, applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={Store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

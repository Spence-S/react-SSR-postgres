import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from '../client/Routes';
import { renderRoutes } from 'react-router-config';
// protect against xss attacks
import serialize from 'serialize-javascript';

export default (req, Store, context) => {
  const content = renderToString(
    <Provider store={Store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `
   <html>
      <head>
      </head>
      <body>
        <div id='root'>${content}</div>
        <script>window.__initialState=${serialize(Store.getState())}</script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};

import React from 'React';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import App from './App';
import FourOhFour from './pages/FourOhFour';
import PrivatePage from './pages/PrivatePage';
export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...UsersListPage,
        path: '/users'
      },
      {
        ...PrivatePage,
        path: '/private'
      },
      {
        ...FourOhFour
      }
    ]
  }
];

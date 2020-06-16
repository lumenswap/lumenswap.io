import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from 'src/history';
import store from 'src/store';
import App from './App';

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

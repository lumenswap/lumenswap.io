import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from 'Root/history';
import store from 'Root/store';
import App from './App';

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

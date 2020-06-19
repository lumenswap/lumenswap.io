import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import App from './views';
import store from './store';
import fetchUserBalance from './api/fetchUserBalance';
import setToken from './actions/setToken';

setInterval(() => {
  const detail = store.getState().user.detail;
  if (detail.publicKey) {
    fetchUserBalance(detail.publicKey).then((balances) => {
      setToken(balances);
    }).catch(() => {
      setToken([]);
    });
  }
}, 2000);

render(
  <App />,
  global.document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') {
      console.clear();
    }
  });
}

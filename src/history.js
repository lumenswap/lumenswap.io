import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

if (process.env.NODE_ENV !== 'production') {
  global.myHistory = history;
}

export default history;

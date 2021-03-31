import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import LModal from 'pages/LModal';
import setUserBalance from 'actions/userBalance';
import { fetchAccountTokenList } from 'api/stellar';
import balanceMapper from 'helpers/balanceMapper';
import history from './history';
import Home from './pages/Home';
import Demo from './pages/Demo';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

setInterval(() => {
  const storeData = store.getState();
  if (storeData.user.logged) {
    fetchAccountTokenList(storeData.user.detail.address).then((res) => {
      setUserBalance(res.map(balanceMapper));
    });
  }
}, 2000);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LModal />
        <Router history={history}>
          <Route exact path="/" component={Home} />
          <Route exact path="/demo" component={Demo} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

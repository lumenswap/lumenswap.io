import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import LModal from 'pages/LModal';
import { setUserBalance } from 'actions/userBalance';
import { fetchAccountTokenList } from 'api/stellar';
import balanceMapper from 'helpers/balanceMapper';
import Home from './pages/Home';
import Spot from './pages/Spot';
import Auction from './pages/Auction';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';

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
        <BrowserRouter>
          <LModal />
          <Route exact path="/" component={() => <Redirect to="/swap" />} />
          <Route exact path="/swap" component={Home} />
          <Route exact path="/spot" component={Spot} />
          <Route exact path="/auction" component={Auction} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

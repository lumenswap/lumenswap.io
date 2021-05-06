import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import LModal from 'pages/LModal';
import { setUserBalance } from 'actions/userBalance';
import { fetchAccountTokenList } from 'api/stellar';
import balanceMapper from 'helpers/balanceMapper';
import Home from './pages/Home';
import Spot from './pages/Spot';
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
        <BrowserRouter>
          <LModal />
          <Route exact path="/" component={Home} />
          <Route exact path="/swap" component={Home} />
          {/* <Route exact path="/spot" component={Spot} /> */}
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

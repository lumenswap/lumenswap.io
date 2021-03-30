import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import LModal from 'pages/LModal';
import history from './history';
import Home from './pages/Home';
import Demo from './pages/Demo';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

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

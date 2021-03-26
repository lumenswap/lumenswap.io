import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import history from './history';
import Home from './pages/Home';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router history={history}>
          <Route exact path="/" component={Home} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

import { Provider } from 'react-redux';
import { useStore } from 'store';
import { persistStore } from 'redux-persist';
import { useRef, useEffect } from 'react';
import { setUserBalance } from 'actions/userBalance';
import { fetchAccountTokenList } from 'api/stellar';
import balanceMapper from 'helpers/balanceMapper';
import { PersistGate } from 'redux-persist/integration/react';
import LModal from '../containers/LModal';
import '../../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';

function MyApp({ Component, pageProps }) {
  const intervalRef = useRef(null);

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const storeData = store.getState();
      if (storeData.user.logged) {
        fetchAccountTokenList(storeData.user.detail.address).then((res) => {
          store.dispatch(setUserBalance(res.map(balanceMapper)));
        });
      }
    }, 2000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <LModal />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

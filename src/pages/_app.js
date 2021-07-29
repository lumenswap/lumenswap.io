import { Provider } from 'react-redux';
import { useStore } from 'store';
import { persistStore } from 'redux-persist';
import { useRef, useEffect } from 'react';
import { setUserBalance } from 'actions/userBalance';
import { fetchAccountTokenList } from 'api/stellar';
import balanceMapper from 'helpers/balanceMapper';
import LModal from './LModal';
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
          setUserBalance(res.map(balanceMapper));
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
        <LModal />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;

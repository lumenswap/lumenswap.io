import { Provider } from 'react-redux';
import { useStore } from 'store';
import { persistStore } from 'redux-persist';
import { useRef, useEffect } from 'react';
import { setUserBalance } from 'actions/userBalance';
import { fetchAccountDetails } from 'api/stellar';
import balanceMapper from 'helpers/balanceMapper';
import { PersistGate } from 'redux-persist/integration/react';
import updateUserDetail from 'actions/user/updateUserDetail';
import ServerSideLoading from 'components/ServerSideLoading';
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
        fetchAccountDetails(storeData.user.detail.address).then((res) => {
          store.dispatch(setUserBalance(res.balances.map(balanceMapper)));
          store.dispatch(updateUserDetail({ subentry: res.subentry }));
        }).catch(() => { });
      }
    }, 2000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return process.browser ? (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ServerSideLoading>
            <LModal />
            <Component {...pageProps} />
          </ServerSideLoading>
        </PersistGate>
      </Provider>
    </>
  ) : (
    <Provider store={store}>
      <ServerSideLoading>
        <LModal />
        <Component {...pageProps} />
      </ServerSideLoading>
    </Provider>
  );
}

export default MyApp;

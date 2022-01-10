import { Provider } from 'react-redux';
import { useStore } from 'store';
import { persistStore } from 'redux-persist';
import { useRef, useEffect } from 'react';
import { setUserBalance } from 'actions/userBalance';
import { fetchAccountDetails, fetchXLMCoingeckoPrice } from 'api/stellar';
import { updateXLMPrice } from 'actions/xlmPrice';
import { filterUserBalance } from 'helpers/balanceMapper';
import loginWithRabet from 'walletIntegeration/logins/loginWithRabet';
import { loginTypes } from 'reducers/user';
import userLogin from 'actions/user/login';
import { closeModalAction } from 'actions/modal';
import validateRabetPresent from 'walletIntegeration/logins/validateRabetPresent';
import { PersistGate } from 'redux-persist/integration/react';
import updateUserDetail from 'actions/user/updateUserDetail';
import LModal from '../containers/LModal';

import '../../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import 'react-circular-progressbar/dist/styles.css';

function MyApp({ Component, pageProps }) {
  const updateUserDetailIntervalRef = useRef(null);
  const xlmPriceIntervalRef = useRef(null);

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  async function fullRabetLogin() {
    try {
      const address = await loginWithRabet();

      const accountDetail = await fetchAccountDetails(address);
      store.dispatch(userLogin(loginTypes.RABET, { address, subentry: accountDetail.subentry }));
      store.dispatch(setUserBalance(filterUserBalance(accountDetail.balances)));

      store.dispatch(closeModalAction());
    } catch (e) {}
  }

  useEffect(() => {
    updateUserDetailIntervalRef.current = setInterval(() => {
      const storeData = store.getState();
      if (storeData.user.logged) {
        fetchAccountDetails(storeData.user.detail.address).then((res) => {
          store.dispatch(setUserBalance(filterUserBalance(res.balances)));
          store.dispatch(updateUserDetail({ subentry: res.subentry }));
        }).catch(() => { });
      }
    }, 2000);

    fetchXLMCoingeckoPrice().then((price) => {
      store.dispatch(updateXLMPrice(price));
    }).catch(() => {});
    xlmPriceIntervalRef.current = setInterval(() => {
      fetchXLMCoingeckoPrice().then((price) => {
        store.dispatch(updateXLMPrice(price));
      }).catch(() => {});
    }, 60000);

    return () => {
      clearInterval(updateUserDetailIntervalRef.current);
      clearInterval(xlmPriceIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    console.log('run shod');
    setTimeout(() => {
      if (validateRabetPresent()) {
        fullRabetLogin();
        global.rabet?.on('accountChanged', () => {
          fullRabetLogin();
        });
      }
    }, 1000);
  }, []);

  return process.browser ? (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LModal />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  ) : (
    <Provider store={store}>
      <LModal />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

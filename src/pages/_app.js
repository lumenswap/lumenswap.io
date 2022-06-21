import { Provider } from 'react-redux';
import { useStore, wrapper } from 'store';
import { persistStore } from 'redux-persist';
import { useRef, useEffect } from 'react';
import { setUserBalance } from 'actions/userBalance';
import { fetchAccountDetails, fetchLSPPriceFromHorizon, fetchXLMCoingeckoPrice } from 'api/stellar';
import { updateLSPPrice } from 'actions/lspPrice';
import { updateXLMPrice } from 'actions/xlmPrice';
import { filterUserBalance } from 'helpers/balanceMapper';
import loginWithRabet from 'walletIntegeration/logins/loginWithRabet';
import { loginTypes } from 'reducers/user';
import userLogin from 'actions/user/login';
import { closeModalAction } from 'actions/modal';
import validateRabetPresent from 'walletIntegeration/logins/validateRabetPresent';
import { PersistGate } from 'redux-persist/integration/react';
import updateUserDetail from 'actions/user/updateUserDetail';
import ToggleDarkModeBtn from 'components/ToggleDarkModeBtn';
import { setDefaultTokens } from 'actions/deafultTokens';
import { getDefaultAssets } from 'api/assets';
import LModal from '../containers/LModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/themeColors.scss';
import '../../styles/App.scss';
import 'rc-slider/assets/index.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-steps/assets/index.css';

async function fullRabetLogin(dispatch) {
  try {
    const address = await loginWithRabet();

    const accountDetail = await fetchAccountDetails(address);
    dispatch(userLogin(loginTypes.RABET, { address, subentry: accountDetail.subentry }));
    dispatch(setUserBalance(filterUserBalance(accountDetail.balances)));
    dispatch(closeModalAction());
  } catch (e) {}
}

function MyApp({ Component, pageProps }) {
  const updateUserDetailIntervalRef = useRef(null);
  const xlmPriceIntervalRef = useRef(null);

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

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

    fetchLSPPriceFromHorizon().then((price) => {
      store.dispatch(updateLSPPrice(price));
    }).catch(() => {});

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
    setTimeout(() => {
      if (validateRabetPresent()) {
        fullRabetLogin(store.dispatch);
        global.rabet?.on('accountChanged', () => {
          fullRabetLogin(store.dispatch);
        });
      }
    }, 1000);
  }, []);
  return process.browser ? (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LModal />
          <div style={{ minHeight: 'calc(100vh - 72px)' }}>
            <Component {...pageProps} />
          </div>
          <ToggleDarkModeBtn />
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

MyApp.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
  const assets = await getDefaultAssets();
  store.dispatch(setDefaultTokens(assets));
});

export default wrapper.withRedux(MyApp);

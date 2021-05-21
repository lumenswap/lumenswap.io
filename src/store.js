import getAssetDetails from 'helpers/getAssetDetails';
import { createStore } from 'redux';
import { persistReducer, createTransform } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import persistStorage from 'redux-persist/lib/storage';
import reducers from './reducers';

const UserCustomTokenTransfer = createTransform(
  (inbound) => inbound,
  (outbound) => outbound.map((i) => getAssetDetails(i)),
  { whitelist: ['userCustomTokens'] },
);

const UserCustomPairTransfer = createTransform(
  (inbound) => inbound,
  (outbound) => outbound.map((i) => ({
    base: getAssetDetails(i.base),
    counter: getAssetDetails(i.counter),
  })),
  { whitelist: ['userCustomPairs'] },
);

const persistorConfig = {
  key: 'lumneswapAppData',
  storage: persistStorage,
  whitelist: ['userCustomTokens', 'userCustomPairs'],
  transforms: [UserCustomTokenTransfer, UserCustomPairTransfer],
};

const persistedReducer = persistReducer(persistorConfig, reducers);

const store = createStore(
  persistedReducer,
);

export const presistedStore = persistStore(store);

if (process.env.NODE_ENV !== 'production') {
  global.store = store;
}

export default store;

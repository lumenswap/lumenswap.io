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

const persistorConfig = {
  key: 'lumneswapAppData',
  storage: persistStorage,
  whitelist: ['userCustomTokens'],
  transforms: [UserCustomTokenTransfer],
};

const persistedReducer = persistReducer(persistorConfig, reducers);

const store = createStore(
  persistedReducer,
);

persistStore(store);

if (process.env.NODE_ENV !== 'production') {
  global.store = store;
}

export default store;

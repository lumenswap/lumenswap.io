import { createStore } from 'redux';
import { useMemo } from 'react';
import { persistReducer, createTransform } from 'redux-persist';
// import persistStore from 'redux-persist/es/persistStore';
import persistStorage from 'redux-persist/lib/storage';
import reducers from 'reducers';
import getAssetDetails from 'helpers/getAssetDetails';

let store;

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

function makeStore() {
  return createStore(
    persistedReducer,
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const storeCpy = useMemo(() => initializeStore(initialState), [initialState]);
  return storeCpy;
}

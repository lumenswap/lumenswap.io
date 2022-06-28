import { applyMiddleware, createStore } from 'redux';
import { useMemo } from 'react';
import { persistReducer, createTransform } from 'redux-persist';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import persistStorage from 'redux-persist/lib/storage';
import reducers from 'reducers';
import { getAssetDetails } from 'helpers/asset';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

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

const mainReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.theme) nextState.theme = state.theme;
    if (state.user) nextState.user = state.user;
    if (state.userCustomTokens) nextState.userCustomTokens = state.userCustomTokens;
    if (state.modal) nextState.modal = state.modal;
    if (state.userCustomPairs) nextState.userCustomPairs = state.userCustomPairs;
    if (state.userBalance) nextState.userBalance = state.userBalance;
    if (state.xlmPrice) nextState.xlmPrice = state.xlmPrice;
    if (state.lspPrice) nextState.lspPrice = state.lspPrice;
    if (state.customOrderPrice) nextState.customOrderPrice = state.customOrderPrice;
    if (state.userCustomPairs) nextState.userCustomPairs = state.userCustomPairs;
    return nextState;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistorConfig, mainReducer);

export function makeStore() {
  return createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
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

export const wrapper = createWrapper(initializeStore, { debug: false });

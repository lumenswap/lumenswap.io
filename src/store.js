import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import persistStorage from 'redux-persist/lib/storage';
import reducers from './reducers';

const persistorConfig = {
  key: 'lumneswapAppData',
  storage: persistStorage,
};

const persistedReducer = persistReducer(persistorConfig, reducers);

const store = createStore(
  reducers,
);

if (process.env.NODE_ENV !== 'production') {
  global.store = store;
}

export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducer from './reducers/index';

/* middlewares */
import logMiddleware from './middlewares/logMiddleware';
import productMiddleware from './middlewares/productMiddleware';
import shopkeeperMiddleware from './middlewares/shopkeeperMiddleware';
import donationMiddleware from './middlewares/donationMiddleware';
import beneficiaryMiddleware from './middlewares/beneficiaryMiddleware';
import updateProfilMiddleware from './middlewares/updateProfilMiddleware';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  whitelist: ['user'],
  blacklist: ['donation'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    logMiddleware,
    productMiddleware,
    donationMiddleware,
    shopkeeperMiddleware,
    beneficiaryMiddleware,
    updateProfilMiddleware,
  ),
);

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(pReducer, enhancers);
export const persistor = persistStore(store);

export default store;

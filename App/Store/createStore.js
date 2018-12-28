// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import DebugSetting from '../Config/DebugSetting';
import rootReducer from './reducers';
import sagas from './sagas';
import createApi from '../Services/api';
import { selectToken } from '../Modules/Login/Module/duck';
// import { createTokenAwareApi }
//

const setupLogger = () => {
  const LOGGING_BLACKLIST = [
    'EFFECT_TRIGGERED',
    'EFFECT_RESOLVED',
    'EFFECT_REJECTED',
    'persist/REHYDRATE',
    '@@network-connectivity/CONNECTION_CHANGE',
  ];

  return createLogger({
    predicate: (getState, { type }) => LOGGING_BLACKLIST.indexOf(type) === -1,
    collapsed: (getState, action, logEntry) => !logEntry.error,
  });
};

const sagaLogger = (level, message, error = '') => {
  // eslint-disable-next-line
  if (level = 'warning') {
    // eslint-disable-next-line no-param-reassign
    level = 'warn';
  }
  if (error.includes('Generator is already running')) return;

  if (typeof window === 'undefined') {
    console.log(`redux-saga ${level}:${message}\n${(error && error.stack) || error}`);
  } else {
    console[level](message, error);
  }
};

export default () => {
  const sagaMiddleware = createSagaMiddleware({ logger: sagaLogger });
  const middleware = [sagaMiddleware];

  // need add development mode verification
  if (__DEV__ && DebugSetting.reduxLogging) {
    middleware.push(setupLogger());
  }

  const enhancer = compose(
    applyMiddleware(
      ...middleware,
    ),
  );

  const store = createStore(
    rootReducer,
    enhancer,
  );

  const getToken = () => selectToken(store.getState());

  // const api = createRefreshTokenAwareApi(createApi(getToken));
  const api = createApi(getToken);

  sagaMiddleware.run(sagas(api));

  persistStore(store);

  return store;
};

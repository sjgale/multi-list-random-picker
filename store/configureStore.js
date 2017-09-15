
import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from '../reducers';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

// Middleware for thunk, logging state
var middlewares = compose(applyMiddleware(thunk, logger), autoRehydrate());

export default function configureStore(data = {}) {
  const store = createStore(reducers, data, middlewares);
  AsyncStorage.clear();
  persistStore(store, {storage: AsyncStorage});
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import reducer from './reducers';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

//Configuration useful to allows multiple stores easily (used for testing)
const configureStore = () => {
  //This starts the redux developer tools that allow us to see redux state in
  //google chrome plugin
  const composeEnhancers = composeWithDevTools({
    //options
  });

  //This is the middleware that logs states to console
  const Logger = logger({
    // Ignore `CHANGE_FORM` actions in the logger, since they fire after every keystroke
    //predicate: (getState, action) => action.type !== 'CHANGE_FORM'
  })

  // Creates the Redux reducer with the redux-thunk middleware, which allows us
  // to do asynchronous calls in actions, implemented as callbacks
  const middleware = composeEnhancers(applyMiddleware(promise(),thunk,Logger));

  //Create the store
  const store = createStore(reducer, middleware);

  //This function subscribes the saveState function to the store so that
  //every 1000 ms there is a change the store is saved
  //I use the throttle api from lodash to control this
  //TODO only subscibe a certain value of the store to local state
  saveState(store.getState());
  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

//Export configureStore so it can be loaded in the provider in index.js
export default configureStore;

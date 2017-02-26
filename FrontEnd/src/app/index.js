/**
 *
 * index.js
 *
 * This is the entry file for the application, mostly just setup
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { homeReducer } from './reducers/reducers';

// Import the CSS file, which webpack transfers to the build folder
import '../../css/main.css';

// Importing componenets

import {ExplorePage, ActivitiesPage, AboutUsPage, SignInPage, SignUpPage, NotFound} from 'pages';

import Settings from './components/pages/Settings'
import Profile from './components/pages/Profile'
import TourCreation from './components/pages/TourCreation';
import TourSignup from './components/pages/TourSignup';

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);

function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();

  // check if the path isn't dashboard
  // that way we can apply specific logic
  // to display/render the path we want to
  if (nextState.location.pathname !== '/dashboard') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}

const rootElement = document.getElementById('app');
ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={ExplorePage}/>
        <Route path="/activities" component={ActivitiesPage}/>
        <Route path="/about" component={AboutUsPage}/>
        <Route path="/sign" component={SignInPage}/>
        <Route onEnter={checkAuth}>
          <Route path='/signup' component={SignUpPage}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/settings" component={Settings}/>
          <Route path='/tour-creation' component={TourCreation}/>
          <Route path='/tour-signup' component={TourSignup}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>),rootElement);

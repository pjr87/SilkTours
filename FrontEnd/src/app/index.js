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
import store from "./store";
import { Provider } from 'react-redux';

// Import the CSS file, which webpack transfers to the build folder
//import '../../css/main.css';

// Importing componenets

import {ExplorePage, ActivitiesPage, AboutUsPage, SignInPage, SignUpPage, NotFound} from 'pages';

import Settings from './components/pages/Settings'
import Profile from './components/pages/Profile'
import TourCreation from './components/pages/TourCreation';
import TourSignup from './components/pages/TourSignup';
import App from './components/App';

const rootElement = document.getElementById('app');
ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={ExplorePage}/>
        <Route path="/activities" component={ActivitiesPage}/>
        <Route path="/about" component={AboutUsPage}/>
        <Route path="/sign" component={SignInPage}/>
        <Route onEnter={store.checkAuth}>
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

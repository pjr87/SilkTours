import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

// Importing componenets
import {ExplorePage, ActivitiesPage, AboutUsPage, SignInPage, SignUpPage, NotFound} from '../pages';
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import TourCreation from './pages/TourCreation';
import TourSignup from './pages/TourSignup';
import App from './App';
import { loadState } from '../localStorage';

/* Fucntion used when determing access rights to certain pages in index.js*/
function checkAuth(nextState, replaceState) {
  let tmpState = loadState();
  console.log("tmpState", tmpState);
  let loggedIn = tmpState.AuthReducer.loggedIn;

    if (loggedIn) {
      console.log("2");
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
    else {
      console.log("3");
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
}

const Root = ({ store }) => (
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
  </Provider>
);

export default Root;

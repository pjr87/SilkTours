import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

// Importing componenets
import {ExplorePage, ActivitiesPage, AboutUsPage, SignInPage, SignUpPage, ContactUsPage, NotFound} from '../pages';
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import TourCreation from './pages/TourCreation';
import TourSignup from './pages/TourSignup';
import App from './App';
import { loadState } from '../localStorage';
import Messages from './pages/Messages';


/* Fucntion used when determing access rights to certain pages in index.js*/
function checkAuth(nextState, replaceState) {
  let tmpState = loadState();
  let loggedIn = tmpState.AuthReducer.loggedIn;
  //TODO verify login isnt fake?

  //If user is logged in allow them to
  if (loggedIn) {
    if (nextState.location.state && nextState.location.pathname) {
      replaceState(null, nextState.location.pathname);
    } else {
      replaceState(null, '/');
    }
  }
  else {
    //User is not logged in so push them to signin
    if (nextState.location.state && nextState.location.pathname) {
      replaceState(null, nextState.location.pathname);
    } else {
      replaceState(null, '/sign');
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
        <Route path='/contactus' component={ContactUsPage}/>
        <Route onEnter={checkAuth}>
          <Route path='/signup' component={SignUpPage}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/settings" component={Settings}/>
          <Route path='/tour-creation' component={TourCreation}/>
          <Route path='/tour-signup' component={TourSignup}/>
          <Route path='/messages' component={Messages}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
);

export default Root;

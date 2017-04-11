import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

// Importing componenets
import{
  ExplorePage,
  TourDetailPage,
  TourConfirmationPage,
  AboutUsPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
  ConfirmationPage,
  TourCreationPage,
  BecomeGuidePage,
  MyToursPage,
  ContactUsPage,
  SettingsPage,
  NotFound,
  MessagesPage } from '../pages';
import {ContactUsRedux} from '../pages';
import TourSignup from './pages/TourSignup';
import App from './App';
import { loadState } from '../localStorage';
import MessagesReact from './pages/MessageReact.js';

import MessageBody from './MessageBody/MessageBody.js';

/* Fucntion used when determing access rights to certain pages in index.js*/
function checkAuth(nextState, replaceState) {
  let tmpState = loadState();
  let loggedIn = tmpState.AuthReducer.loggedIn;

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
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={ExplorePage}/>
        <Route path="/tourdetail" component={TourDetailPage}/>
        <Route path="/about" component={AboutUsPage}/>
        <Route path="/sign" component={SignInPage}/>
        <Route path='/contactus' component={ContactUsPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/confirmationpage' component={ConfirmationPage}/>
        <Route path='/messagereact' component={MessagesReact} />
        <Route path='/contactusredux' component ={ContactUsRedux} />
        <Route path='/notfound' component ={NotFound} />
        <Route path='/profile' component ={ProfilePage} />
        <Route onEnter={checkAuth}>
          <Route path="/tourconfirmation" component={TourConfirmationPage}/>
          <Route path="/my-tours" component={MyToursPage}/>
          <Route path="/settings" component={SettingsPage}/>
          <Route path='/tour-creation' component={TourCreationPage}/>
          <Route path='/become-guide' component={BecomeGuidePage}/>
          <Route path='/tour-signup' component={TourSignup}/>
          <Route path='/messages' component={MessagesPage}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
);

export default Root;

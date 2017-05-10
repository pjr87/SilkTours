import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

// Importing componenets
import{
  LandingPage,
  ExplorePage,
  TourDetailPage,
  TourConfirmationPage,
  AboutUsPage,
  SignInPage,
  SignInRedirectPage,
  SignUpPage,
  ProfilePage,
  ConfirmationPage,
  TourCreationPage,
  BecomeGuidePage,
  MyToursPage,
  ContactUsPage,
  SettingsPage,
  NotFound,
  MessagesPage,
  PrivacyPage,
  TermsPage,
  PolicyPage} from '../pages';
import {ContactUsRedux} from '../pages';
import App from './App';
import { loadState } from '../localStorage';

/* Function used when determing access rights to certain pages in index.js*/
function checkAuth(nextState, replaceState) {
  let tmpState = loadState();
  let loggedIn = tmpState.AuthReducer.loggedIn;

  //If user is not logged in then redirect them to sign in page
  if (!loggedIn) {
    browserHistory.push('/signredirect');
  }
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={LandingPage}/>
        <Route path="/explore" component={ExplorePage}/>
        <Route path="/tourdetail" component={TourDetailPage}/>
        <Route path="/about" component={AboutUsPage}/>
        <Route path="/sign" component={SignInPage}/>
        <Route path="/signredirect" component={SignInRedirectPage}/>
        <Route path='/contactus' component={ContactUsPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/confirmationpage' component={ConfirmationPage}/>
        <Route path='/contactusredux' component ={ContactUsRedux} />
        <Route path='/notfound' component ={NotFound} />
        <Route path='/terms' component={TermsPage} />
        <Route path='/privacy' component={PrivacyPage} />
        <Route path='/policy' component={PolicyPage} />
        <Route onEnter={checkAuth}>
          <Route path='/messagereact' component={MessagesReact} />
          <Route path='/profile' component ={ProfilePage} />
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Importing componenets

import {ExplorePage, ActivitiesPage, AboutUsPage, SignInPage, SignUpPage, SettingsPage, TourCreationPage} from 'pages';

import Settings from './components/pages/Settings'
import MyTours from './components/pages/MyTours'
import TourCreation from './components/pages/TourCreation';
import TourSignup from './components/pages/TourSignup';

const rootElement = document.getElementById('app');
ReactDOM.render((<Router history={browserHistory}>
    <div>
      <Route path="/my-tours" component={MyTours}/>

      <Route path="/" component={ExplorePage}/>
      <Route path="/activities" component={ActivitiesPage}/>
      <Route path="/about" component={AboutUsPage}/>
      <Route path="/sign" component={SignInPage}/>
      <Route path='/signup' component={SignUpPage}/>

      <Route path="/settings" component={SettingsPage}/>
      <Route path='/tour-creation' component={TourCreationPage}/>
      <Route path='/tour-signup' component={TourSignup}/>
      <Route path="*" component={ExplorePage}/>
    </div>
  </Router>), rootElement);

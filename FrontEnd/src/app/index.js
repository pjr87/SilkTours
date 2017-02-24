import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Importing componenets

import {ExplorePage, ActivitiesPage, AboutUsPage, SignInPage, SignUpPage} from 'pages';

import Settings from './components/pages/Settings'
import Profile from './components/pages/Profile'
import TourCreation from './components/pages/TourCreation';
import TourSignup from './components/pages/TourSignup';

import Messages from './components/pages/Messages';

import ContactUs from './components/pages/ContactUs';
import MessageReact from './components/pages/MessageReact';


const rootElement = document.getElementById('app');
ReactDOM.render((<Router history={browserHistory}>
    <div>
      <Route path="/" component={ExplorePage}/>
      <Route path="/activities" component={ActivitiesPage}/>
      <Route path="/about" component={AboutUsPage}/>
      <Route path="/sign" component={SignInPage}/>
      <Route path='/signup' component={SignUpPage}/>
      <Route path='/contactus' component={ContactUs} />
      <Route path='/messages' component={Messages}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/settings" component={Settings}/>
      <Route path='/tour-creation' component={TourCreation}/>
      <Route path='/tour-signup' component={TourSignup}/>
      <Route path='/messagereact' component={MessageReact}/>
      <Route path="*" component={ExplorePage}/>
    </div>
  </Router>), rootElement);

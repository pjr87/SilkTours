import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Importing componenets
import ExplorePage from './components/pages/ExplorePage';
import ExplorePage2 from './components/pages/ExplorePage2';
import Activities from './components/pages/Activities';
import AvailableToursPage from './components/pages/AvailableToursPage';
import Header from './components/header/Header';
import Settings from './components/pages/Settings'
import MyTours from './components/pages/MyTours'
import Sign from './components/pages/Sign';
import SignUp from './components/pages/SignUp';
import About from './components/pages/About';
import TourCreation from './components/pages/TourCreation';
import TourSignup from './components/pages/TourSignup';

const rootElement = document.getElementById('app');
ReactDOM.render((<Router history={browserHistory}>
    <div>
      <Route path="/" component={ExplorePage2}/>
      <Route path="/activities" component={Activities}/>
      <Route path="/about" component={About}/>
      <Route path="/sign" component={Sign}/>
      <Route path='/signup' component={SignUp}/>
      <Route path="/explore" component={AvailableToursPage}/>
      <Route path="/my-tours" component={MyTours}/>
      <Route path="/settings" component={Settings}/>
      <Route path='/tour-creation' component={TourCreation}/>
      <Route path='/tour-signup' component={TourSignup}/>
      <Route path="*" component={ExplorePage2}/>
    </div>
  </Router>), rootElement);

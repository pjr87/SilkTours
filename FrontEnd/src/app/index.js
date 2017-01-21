import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Match, Miss, browserHistory } from 'react-router';

// Importing componenets
import ExplorePage from './components/pages/ExplorePage';
import ExplorePage2 from './components/pages/ExplorePage2';
import Activities from './components/pages/Activities';
import AvailableToursPage from './components/pages/AvailableToursPage';
import Header from './components/header/Header';
import Settings from './components/pages/Settings'
import Profile from './components/pages/Profile'
import Sign from './components/pages/Sign';
import About from './components/pages/About';

const rootElement = document.getElementById('app');
ReactDOM.render((<Router history={browserHistory}>
    <div>

      <Match exactly pattern='/' component={ExplorePage} />
      <Match pattern='/activities' component={ExplorePage2}/>

      <Match pattern='/about' component={About}/>
      <Match pattern='/sign' component={Sign}/>

      <Match pattern='/profile' component={Profile}/>
      <Match pattern='/settings' component={Settings}/>

      <Match pattern='/explore' component={AvailableToursPage}/>
    </div>
  </Router>), rootElement);

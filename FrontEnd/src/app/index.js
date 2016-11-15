import React from 'react';
import ReactDOM from 'react-dom';
import ExplorePage from './components/ExplorePage';
import Activities from './components/Activities';
import AvailableToursPage from './components/AvailableToursPage';
import Header from './components/Header';
import Sign from './components/Sign';
import About from './components/About';
import { BrowserRouter as Router, Route, Link, Match, Miss, browserHistory } from 'react-router';

const rootElement = document.getElementById('app');
ReactDOM.render((<Router history={browserHistory}>
    <div>
      <Match exactly pattern='/' component={ExplorePage} />
      <Match pattern='/activities' component={Activities}/>
      <Match pattern='/about' component={About}/>
      <Match pattern='/sign' component={Sign}/>
      <Match pattern='/sign' component={Sign}/>
      <Match pattern='/explore' component={AvailableToursPage}/>
    </div>
  </Router>), rootElement);

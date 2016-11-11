import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import style from './style/style.css';
import logoImg from './style/images/logo.png';
import logoImg2 from './style/images/logo2.png';
import Home from './Home';
import About from './About';
import Activities from './Activities';
import Sign from './Sign';
import ExplorePage from './ExplorePage';
import MyTours from './MyTours';

const Header = () => {
  return (
    <Router>
      <div className = {style.header} id="home">
      <div className = {style.header_top}>
        <div className={style.wrap}>
          <div className={style.logo}><img src={logoImg}/></div>
          <div className={style.logo2}><p>silk tours</p></div>
          <div className={style.menu}>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/myTours'>My Tours</Link></li>
              <li><Link to='/about'>About us</Link></li>
              <li><Link to='/sign'>Sign in</Link></li>
            </ul>
            <hr/>
           </div>
          </div>
          </div>
          <div className="image">
            <figure><img src={logoImg2} alt="image" width="100%" height="500"/></figure>
	          <h2>call to action</h2>
	          <h3>call to action</h3>
	        </div>
          <Match exactly pattern='/' component={ExplorePage}/>
          <Match pattern='/MyTours' component={MyTours}/>
          <Match pattern='/about' component={About}/>
          <Match pattern='/sign' component={Sign}/>
        </div>
    </Router>
  );
};

export default Header;

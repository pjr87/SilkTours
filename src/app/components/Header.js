import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import style from './style/style.css';
import logoImg from './style/images/logo.png';
import logoImg2 from './style/images/logo2.png';
import Home from './Home';
import About from './About';
import Activities from './Activities';
import Sign from './Sign';


const Header = () => {
  return (
    <Router>
      <div className="header" id="home">
      <div className = {style.header_top}>
        <div className={style.wrap}>
          <div className={style.logo}><img src={logoImg}/></div>
          <div className={style.logo2}><p>silk tours</p></div>
          <div className={style.menu}>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/activities'>Activities</Link></li>
              <li><Link to='/about'>About us</Link></li>
              <li><Link to='/sign'>Sign in</Link></li>
            </ul>
            <hr/>
            <Match exactly pattern='/' component={Home}/>
            <Match pattern='/activities' component={Activities}/>
            <Match pattern='/about' component={About}/>
            <Match pattern='/sign' component={Sign}/>
           </div>
          </div>
          </div>
          <div className="image">
            <figure><img src={logoImg2} alt="image" width="100%" height="500"/></figure>
	          <h2>call to action</h2>
	          <h3>call to action</h3>
	        </div>
        </div>
    </Router>
  );
};

export default Header;

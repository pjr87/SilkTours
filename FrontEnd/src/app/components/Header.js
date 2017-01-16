import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import style from './style/style.css';
import logoImg from './style/images/logo.png';
import logoImg2 from './style/images/logo2.png';
import Home from './Home';
import About from './About';
import Activities from './Activities';
import Sign from './Sign';
import ExplorePage from './ExplorePage';
import AvailableToursPage from './AvailableToursPage';
import AccountDropdown from './Dropdown';

//import Dropdown from './Dropdown';
//import DropdownTrigger from Dropdown.DropdownTrigger;
//var DropdownContent = Dropdown.DropdownContent;

class Signin extends React.Component {
  handleLinkClick() {
      this.refs.dropdown.hide();
    }

  render(){
    if(this.props.loggedIn){
      var button = (<AccountDropdown name={this.props.name} />);
    }
    else{
      var button = (<Link to='/sign'> Sign in </Link>);
    }
    return button;
  }
}

class Header extends React.Component {
  render(){

    if(this.props.largeHeader){
      var header = ( <div className="image">
        <figure><img src={logoImg2} alt="image" width="100%" height="500" /></figure>
        <h2>call to action</h2>
        <h3>call to action</h3>
      </div> );
    }
    else {
      var header = ( <div>
        <div style={{height:74}}></div>
    <div className={style.smallHeaderImage}>
        <img src={logoImg2} alt="image" width="100%" height="74" />
      </div>
    </div>
    );
    }


    return(
      <div className = {style.header} id="home">
      <div className = {style.header_top}>
        <div className={style.wrap}>
          <div className={style.logo}><img src={logoImg}/></div>
          <div className={style.logo2}><p>silk tours</p></div>
          <div className={style.menu}>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/activities'>Activities</Link></li>
              <li><Link to='/about'>About us</Link></li>
              <li> <Signin loggedIn={true} name="Donald Trump"/> </li>
            </ul>
            <hr/>
           </div>
          </div>
          </div>
          {header}
        </div>
  )
  }
}

export default Header;

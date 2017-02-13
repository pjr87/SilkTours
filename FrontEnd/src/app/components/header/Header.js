import React from 'react';
import {Link} from 'react-router';

// Importing css style and images
import style from '../../style/style.css';
import logoImg from '../../style/images/logo.png';
import logoImg2 from '../../style/images/logo2.png';

// Importing components
import About from '../pages/About';
import Activities from '../pages/Activities';
import Sign from '../pages/Sign';
import ExplorePage from '../pages/ExplorePage';
import AvailableToursPage from '../pages/AvailableToursPage';
import AccountDropdown from '../Dropdown';
import AuthStore from "../../stores/AuthStore.js";
import GetData from "../../databaseFunctions";

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

// Header page in ES6 with headerbar, and footer.
class Header extends React.Component {
  constructor(props) {
  super(props);
  }
  render(){
    if(AuthStore.signedIn()){
      var profile = AuthStore.getProfile();
      //GetData.getUser(1);
    }
    else {


      var profile = {first_name:"T", last_name:"S"};
    }
    if(this.props.largeHeader){
      var header = ( <div className="image">
        <figure><img src={this.props.fileName} alt="image" width="100%" height="500" /></figure>
      </div> );
    }
    else {
      var header = ( <div>
        <div style={{height:74}}></div>
    <div className={style.smallHeaderImage}>
        <img src={this.props.fileName} alt="image" width="100%" height="74" />
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
              <li> <Signin loggedIn={AuthStore.signedIn()} name={profile.name} /> </li>
            </ul>
            <hr/>
           </div>
          </div>
          </div>
          <div className="image">
            <figure><img src={this.props.fileName} alt="image" width="100%" height="500"/></figure>
	        </div>
        </div>
  )
  }
}

export default Header;

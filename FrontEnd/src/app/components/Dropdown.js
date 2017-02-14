import React from 'react';
import style from '../style/style.css';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';


class AccountDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      droppedDown:false
    };
  }

  handleLinkClick() {
    this.setState({droppedDown:false});
  }

  handleOnClick(){
      this.setState({droppedDown:!this.state.droppedDown});
  }
  render(){
    if(this.state.droppedDown){
      var output = (
        <div className={style.dropdown}>
          <a onClick={this.handleOnClick.bind(this)}>
            <div> {this.props.name}</div>
          </a>
          <div className={style.dropdownContent}>
            <Link to='/profile'>profile</Link>
            <Link to='/settings'>settings</Link>
            <Link to='/tour-creation'>Create Tour</Link>
            <Link to='/tour-signup'>Tour Signup</Link>
            <Link to='/messages'>messages</Link>
            <a>logout</a>
          </div>
        </div>);
    }
    else{
      var output = (  <div className={style.dropdown}>
          <a onClick={this.handleOnClick.bind(this)}> <div > {this.props.name}</div> </a>
        </div>
        );
    }
    return output;
  }
}

export default AccountDropdown;

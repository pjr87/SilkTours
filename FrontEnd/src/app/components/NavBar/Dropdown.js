import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';

import Navbar from 'react-bootstrap/lib/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';

import { logout, clearError } from '../../actions/AuthActions';

class Dropdown extends React.Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  renderGuideTab(){
    //if(this.props.isTourGuide){
    if(true){
      return(<LinkContainer to="/tour-creation" onClick={this._clearError}>
          <MenuItem eventKey={4.4}>Create New Tour</MenuItem>
        </LinkContainer>);
    }

    return (<LinkContainer to="/become-guide" onClick={this._clearError}>
        <MenuItem eventKey={4.4}>Become Tour Guide</MenuItem>
      </LinkContainer>);

  }

  render(){
    const renderGuideTab = true ? (
      <LinkContainer to="/tour-creation" onClick={this._clearError}>
          <MenuItem eventKey={4.4}>Create New Tour</MenuItem>
        </LinkContainer>
    ) : (
      <LinkContainer to="/become-guide" onClick={this._clearError}>
          <MenuItem eventKey={4.4}>Become Tour Guide</MenuItem>
        </LinkContainer>
    );

    return (
      <NavDropdown eventKey={4} title = {this.props.usersName} id="nav-dropdown">
        <LinkContainer to="/messages" onClick={this._clearError}>
          <MenuItem eventKey={4.4}>Messages</MenuItem>
        </LinkContainer>
        <LinkContainer to="/my-tours" onClick={this._clearError}>
          <MenuItem eventKey={4.1}>My Tours</MenuItem>
        </LinkContainer>
        <LinkContainer to="/settings" onClick={this._clearError}>
          <MenuItem eventKey={4.2}>Settings</MenuItem>
        </LinkContainer>
        {renderGuideTab}

        <MenuItem
          bsStyle="info"
          disabled={this.props.currentlySending}
          onClick={this._logout}>
          {this.props.currentlySending ? 'Logging out...' : 'Logout'}
        </MenuItem>
      </NavDropdown>
    );
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

Dropdown.propTypes = {
  usersName: React.PropTypes.string,
  currentlySending: React.PropTypes.bool,
  dispatch: React.PropTypes.func
}

export default Dropdown;

import React from 'react';
import style from '../../style/style.css';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';

import Navbar from 'react-bootstrap/lib/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class Dropdown extends React.Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  render(){
    return (
      <NavDropdown eventKey={4} title = {this.props.usersName} id="nav-dropdown">
        <LinkContainer to="/profile" onClick={this._clearError}>
          <MenuItem eventKey={4.1}>profile</MenuItem>
        </LinkContainer>
        <LinkContainer to="/settings" onClick={this._clearError}>
          <MenuItem eventKey={4.2}>settings</MenuItem>
        </LinkContainer>
        <LinkContainer to="/tour-creation" onClick={this._clearError}>
          <MenuItem eventKey={4.3}>Create Tour</MenuItem>
        </LinkContainer>
        <LinkContainer to="/" onClick={this._logout}>
          <MenuItem eventKey={4.3}>Logout</MenuItem>
        </LinkContainer>
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
  dispatch: React.PropTypes.func
}

export default Dropdown;

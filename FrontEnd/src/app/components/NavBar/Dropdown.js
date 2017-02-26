import React from 'react';
import style from '../../style/style.css';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';

class Dropdown extends React.Component {
  render(){
    return (
      <NavDropdown eventKey={4} title = {this.props.name} id="nav-dropdown">
      <LinkContainer to="/profile">
        <MenuItem eventKey={4.1}>profile</MenuItem>
      </LinkContainer>
      <LinkContainer to="/settings">
        <MenuItem eventKey={4.2}>settings</MenuItem>
      </LinkContainer>
      <LinkContainer to="/tour-creation">
        <MenuItem eventKey={4.3}>Create Tour</MenuItem>
      </LinkContainer>
      <LinkContainer to="/" onClick={::this._logout}>
        <MenuItem eventKey={4.3}>Logout</MenuItem>
      </LinkContainer>
      </NavDropdown>
    );
  }
  _logout() {
    this.props.dispatch(logout());
  }
}

export default Dropdown;

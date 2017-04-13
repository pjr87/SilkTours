/**
 *
 * NavBar.js
 *
 * This component renders the navigation bar
 *
 */

import logoImg from '../../style/images/logo.png';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import Image from 'react-bootstrap/lib/Image';
import {LinkContainer} from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout, clearError } from '../../actions/AuthActions';
import Dropdown from './Dropdown';

class NavBar extends Component {
  constructor (props) {
    super(props)
    this._clearError = this._clearError.bind(this)
  }

  render() {
    const dropDown = this.props.loggedIn ? (
      <Dropdown usersName={this.props.usersName}
                currentlySending={this.props.currentlySending}
                dispatch={this.props.dispatch}
                isGuide={this.props.isGuide}/>
    ) : (
      <LinkContainer to="/sign" onClick={this._clearError}>
        <NavItem eventKey={4}>sign in</NavItem>
      </LinkContainer>
    );

    return (
      <div>
        <Navbar fixedTop collapseOnSelect style={{opacity:1}}>
          <Navbar.Header>
            <Navbar.Brand>
              <Image src={logoImg} style={{width:65, height:65, marginTop: -8}} circle/>
            </Navbar.Brand>
            <Navbar.Brand>
              <a href="/">Silk Tours</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/" onClick={this._clearError}>
                <NavItem eventKey={1}>home</NavItem>
              </LinkContainer>
              <LinkContainer to="/about" onClick={this._clearError}>
                <NavItem eventKey={3}>about us</NavItem>
              </LinkContainer>
              {dropDown}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br/>
      </div>
    )
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

NavBar.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  usersName: React.PropTypes.string,
  currentlySending: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
  isGuide: React.PropTypes.bool
}

export default NavBar;

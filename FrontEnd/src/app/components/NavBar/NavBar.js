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
import MenuItem from 'react-bootstrap/lib/MenuItem';

import GetData from "../../utils/databaseFunctions";
import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../../actions/AuthActions';
import Dropdown from './Dropdown';


class NavBar extends Component {
  render() {
    const dropDown = this.props.loggedIn ? (
      <DropDown name={"TEST"}/>
    ) : (
      <LinkContainer to="/sign">
        <NavItem eventKey={4}>sign in</NavItem>
      </LinkContainer>
    );

    return (
      <div>
        <Navbar fixedTop collapseOnSelect style={{opacity:0.5}}>
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
              <LinkContainer to="/">
                <NavItem eventKey={1}>home</NavItem>
              </LinkContainer>
              <LinkContainer to="/activities">
                <NavItem eventKey={2}>activities</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
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
}

NavBar.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool.isRequired
}

export default NavBar;

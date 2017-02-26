import React from 'react';

import logoImg from '../../style/images/logo.png';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import Image from 'react-bootstrap/lib/Image';
import {LinkContainer} from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import GetData from "../../utils/databaseFunctions";

class Header extends React.Component {
  render(){
    var profile = {}
    if(authStore.signedIn()){
      profile = authStore.getProfile();
      //GetData.getUser(1);
    }
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
              <Signin loggedIn={authStore.signedIn()} name={profile.name} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br/>
      </div>
    )
  }
}

class Signin extends React.Component {
  render(){
    if(this.props.loggedIn){
      var button = (
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
        </NavDropdown>
      );
    }
    else{
      var button = (
        <LinkContainer to="/sign">
          <NavItem eventKey={4}>sign in</NavItem>
        </LinkContainer>
      );
    }
    return button;
  }
}

export default Header;

/*
 Sign.js

 User sign in page, integration with FB, AWS
 Written by: Phillip Ryan

 Calls functions from CognitoSync folder to display login functions
 Displayed when Signin is click

 TODO:
  Link back to the home page after sign up
  Add Signin from exisiting user account sequence for (devAuth, Facebook, other)
*/

import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import {DeveloperAuthSignIn} from '../CognitoSync/DeveloperAuthSignIn.js';
import FederatedAuthSignIn from "../CognitoSync/FederatedAuthSignIn.js";
import appConfig from "../CognitoSync/config";
import FaFacebook from 'react-icons/lib/fa/facebook';


import { connect } from 'react-redux';
import { login } from '../../actions/AuthActions';

const responseFacebook = (response) => {
  console.log(response);
  FederatedAuthSignIn.startAWS(response, "Facebook");
}

class SignInContents extends React.Component{
  //Define auth profile state
  constructor(){
    super();
  }

  //Before component mounts, check login state
  componentWillMount() {
    /*authStore.on("login", () => {
      this.setState({
        authProfile: authStore.getProfile(),
      })
    })

    authStore.on("logout", () => {
      this.setState({
        authProfile: authStore.getProfile(), //Will return 0
      })
    })*/
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <DeveloperAuthSignIn/>
        <br/>
        <FacebookLogin
          appId={appConfig.facebookAppId}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          textButton=" Login"
          size="medium"
          icon={<FaFacebook />}
          />
        <br/>
        <br/>
        <p>Don't have one?</p>
        <Link to='/signup'>CREATE ONE</Link>
        <br/>
        <br/>
      </div>
    );
  }
  _login(username, password) {
		this.props.dispatch(login(username, password));
	}
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(SignInContents);

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
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import appConfig from "../CognitoSync/config";
import AuthStore from "../../stores/AuthStore.js"
import logoImg from '../../style/images/logo5.png';
import {DeveloperAuthSignIn} from '../CognitoSync/DeveloperAuthSignIn.js'
import {FederatedAuthSignIn} from '../CognitoSync/FederatedAuthSignIn.js'
import SignUp from './SignUp.js';

const responseFacebook = (response) => {
  //console.log(response);
  var FederatedAuthSignIn = new FederatedAuthSignIn();
  FederatedAuthSignIn.startAWS(response, "facebook");
}

class Sign extends React.Component{
  //Define auth profile state
  constructor(){
    super();
    this.state = {
      authProfile: AuthStore.getProfile(), //Get current profile
    };
  }

  //Before component mounts, check login state
  componentWillMount() {
    AuthStore.on("login", () => {
      this.setState({
        authProfile: AuthStore.getProfile(),
      })
    })

    AuthStore.on("logout", () => {
      this.setState({
        authProfile: AuthStore.getProfile(), //Will return 0
      })
    })
  }

  render() {
    return (
      <div>
      <Header fileName={logoImg}/>

        <FacebookLogin
          appId={appConfig.facebookAppId}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook} />

        <DeveloperAuthSignIn/>

        <Link to='/signup'>SignUp</Link>

      <Footer/>
      </div>
    );
  }
}

export default Sign;

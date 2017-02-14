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
//import AuthStore from "../../stores/AuthStore.js";
import logoImg from '../../style/images/logo5.png';
import {DeveloperAuthSignIn} from '../CognitoSync/DeveloperAuthSignIn.js';
import FederatedAuthSignIn from "../CognitoSync/FederatedAuthSignIn.js";
import SignUp from './SignUp.js';
import FaFacebook from 'react-icons/lib/fa/facebook';

const responseFacebook = (response) => {
  console.log(response);

  FederatedAuthSignIn.startAWS(response, "Facebook");
}

class Sign extends React.Component{
  //Define auth profile state
  constructor(){
    super();
    this.state = {
      authProfile: authStore.getProfile(), //Get current profile
    };
  }

  //Before component mounts, check login state
  componentWillMount() {
    authStore.on("login", () => {
      this.setState({
        authProfile: authStore.getProfile(),
      })
    })

    authStore.on("logout", () => {
      this.setState({
        authProfile: authStore.getProfile(), //Will return 0
      })
    })
  }

  render() {
    return (
      <div>
      <Header fileName={logoImg}/>
        <h4>sign in</h4>
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
      <Footer/>
      </div>
    );
  }
}

export default Sign;

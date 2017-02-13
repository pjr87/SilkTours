/*
 SignUp.js

 User sign up page, integration with FB, AWS
 Written by: Phillip Ryan

 Calls functions from CognitoSync folder to display login functions
 Displayed when Signup is click



 TODO:
  Link back to the home page afer sign up
  Todo phone number verification
  Add SignUp from new user account sequence for (Facebook, other)
*/

import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import appConfig from "../CognitoSync/config";
import AuthStore from "../../stores/AuthStore.js";
import logoImg from '../../style/images/logo5.png';
import {DeveloperAuthSignUp} from '../CognitoSync/DeveloperAuthSignUp.js';
import FederatedAuthSignUp from "../CognitoSync/FederatedAuthSignUp.js";

const responseFacebook = (response) => {
  console.log(response);

  FederatedAuthSignUp.startAWS(response, "Facebook");
}

class SignUp extends React.Component{
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
    return(
      <div>
      <Header fileName={logoImg}/>

      <DeveloperAuthSignUp/>

      <FacebookLogin
        appId={appConfig.facebookAppId}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook} />

      <Footer/>
      </div>
    );
  }
}

export default SignUp;

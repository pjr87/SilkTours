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
import AuthStore from "../../stores/AuthStore.js";
import logoImg from '../../style/images/logo5.png';
import {DeveloperAuthSignIn} from '../CognitoSync/DeveloperAuthSignIn.js';
import FederatedAuthSignIn from "../CognitoSync/FederatedAuthSignIn.js";
import aws from "aws-sdk";
import {
   CognitoUserPool,
   CognitoUserAttribute
 } from "amazon-cognito-identity-js";
import SignUp from './SignUp.js';

const responseFacebook = (response) => {
  console.log(response);

  //var FederatedAuthSignIn = new FederatedAuthSignIn();
  //console.log(FederatedAuthSignIn);
  //FederatedAuthSignIn.startAWS(response, "Facebook");

  aws.config.region = 'us-east-1';

  if(response){
    console.log("Facebook User is logged in " + response.accessToken);

    // Add the Facebook access token to the Cognito credentials login map.
    aws.config.credentials = new aws.CognitoIdentityCredentials({
      IdentityPoolId: appConfig.identityPoolId,
      Logins: {
        'graph.facebook.com': response.accessToken
      }
    });

    // set region if not set (as not set by the SDK by default)
    aws.config.update({
      credentials: aws.config.credentials,
      region: appConfig.region
    });

    // Obtain AWS credentials
    var err;
    aws.config.credentials.get(function(err){
      console.log("TOKEN : " + aws.config.credentials.sessionToken);
      console.log("secretAccessKey : " + aws.config.credentials.secretAccessKey);
      console.log("accessKeyId : " + aws.config.credentials.accessKeyId);
      console.log("expiryWindow : " + aws.config.credentials.expiryWindow);
      console.log("expired : " + aws.config.credentials.expired);
      console.dir("cred : " + aws.config.credentials);
    });

    if(err){
      alert(err);
      return;
    }
    else{
      //TODO get information from facebook
      //TODO pull name from users table

      AuthStore.login("", response.accessToken, "Facebook");
      //TODO move to explore page
    }
  }
  else{
    console.log("error");
  }
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

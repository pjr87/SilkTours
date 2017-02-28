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
import FacebookLogin from 'react-facebook-login';
import appConfig from "../CognitoSync/config";
import {DeveloperAuthSignUp} from '../CognitoSync/DeveloperAuthSignUp.js';
import FederatedAuthSignUp from "../CognitoSync/FederatedAuthSignUp.js";
import FaFacebook from 'react-icons/lib/fa/facebook';

const responseFacebook = (response) => {
  console.log(response);

  FederatedAuthSignUp.startAWS(response, "Facebook");
}

class SignUp extends React.Component{
  //Define auth profile state
  constructor(){
    super();
  }

  render() {
    return(
      <div>
      <DeveloperAuthSignUp/>
      <FacebookLogin
        appId={appConfig.facebookAppId}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        size="medium"
        textButton=" Sign up"
        icon={<FaFacebook />}
        />
      <br/>
      <br/>
      </div>
    );
  }
}

export default SignUp;

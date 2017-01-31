/*
 DeveloperAuthSignIn.js

 Developer authentication class
 Written by: Phillip Ryan

 Purpose is to provide form for users to sign in with
 AWS cognito sync using email and password

 TODO:
 Do Sign in ia developer authenticated process
*/

//import cognito libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import appConfig from "./config";

// Step 1 - Define global AWS identity credentials
Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.identityPoolId,
  region: appConfig.region
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.userPoolId,
  ClientId: appConfig.clientId,
});

//React.Component is abstract base class
//DeveloperAuthSignIn is a subclass of React.Component
export class DeveloperAuthSignIn extends React.Component{

  //Mounting function, called when component is created and inserted into DOM
  //Called before component is mounted
  constructor(props) {
    super(props);

    //The state holds the relevant information a user can enter
    //when signing in via Developer Authentication
    this.state = {
      userName: '',
      password: ''
    };
  }

  handleUserNameChange(e) {
    this.setState({userName: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  //Fucntion called when the signIn form is submited by user
  handleSubmit(e) {
    e.preventDefault();
    const userName = this.state.userName.trim();
    const password = this.state.password.trim();

    //Step 2 - A confirmed user signs in to obtain a session.
    //The session contains:
    // 1. ID token that contains user claims
    // 2. Access token that is used internally to perform authenticated calls
    // 3. Refresh token that is used internally to refresh the session after it expires each hour.

    //authData represents the reqiured userName and password
    const authData = [];

    authData.push(userName);
    authData.push(password);

    var authDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authData);

    var userData = {
        Username : userName,
        Pool : userPool
    };

    var cognitoUser = new CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());

            authStore.updateProfile(1, this.response.name, "DeveloperAuth");
        },

        onFailure: function(err) {
            alert(err);
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
  }

  //Mounting function, called when component is created and inserted into DOM
  //Required method - returns native representation of DOM component
  //Should not modify component state
  render() {
    return (
      <div>
      <h1>Sign In email and password</h1>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Email
          <input type="email"
            value={this.state.userName}
            placeholder="UserName"
            onChange={this.handleUserNameChange.bind(this)}/>
        </label>
        <label>
          Password
          <input type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handlePasswordChange.bind(this)}/>
            <input type="submit" value="Sign In"/>
        </label>
      </form>
      </div>
    );
  }
}

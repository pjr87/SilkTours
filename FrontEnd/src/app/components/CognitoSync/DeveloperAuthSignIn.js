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
import { config, CognitoIdentityCredentials, CognitoIdentityServiceProvider } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import appConfig from "./config";

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

    console.log('username + ' + userName);
    console.log('password + ' + password);

    // Step 1 - Define global AWS identity credentials
    //Config.region = appConfig.region;
    config.update({region:'us-east-1'});

    //Step 2 - A confirmed user signs in to obtain a session.
    //The session contains:
    // 1. ID token that contains user claims
    // 2. Access token that is used internally to perform authenticated calls
    // 3. Refresh token that is used internally to refresh the session after it expires each hour.

    //authData represents the reqiured userName and password
    const authData = {
      Username: userName,
      Password: password,
    };

    var authDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authData);

    const poolData = {
      UserPoolId: appConfig.userPoolId,
      ClientId: appConfig.clientId,
    };

    var userPool = new CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var userData = {
        Username : userName,
        Pool : userPool
    };

    var cognitoUser = new CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());

            /*let loginsIdpData = {};
            let loginsCognitoKey = 'cognito-idp.us-east-1.amazonaws.com/' + appConfig.userPoolId
            loginsIdpData[loginsCognitoKey] = result.getIdToken().getJwtToken();*/

            config.credentials = new CognitoIdentityCredentials({
              IdentityPoolId: appConfig.identityPoolId,
              Logins: {
                  'cognito-idp.us-east-1.amazonaws.com/us-east-1_59hTNVuuw':result.getIdToken().getJwtToken()
              }
            });

            // set region if not set (as not set by the SDK by default)
            config.update({
              credentials: config.credentials,
              region: appConfig.region
            });

            config.credentials.get(function(err){
                if (err) {
                    alert(err);
                }
            });

            cognitoUser.getUserAttributes(function(err, result) {
              if (err) {
                  alert(err);
                  return;
              }
              var i = 0;
              for (i = 0; i < result.length; i++) {
                  console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
              }
            });

          //  authStore.updateProfile(1, "", "DeveloperAuth");
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
      <h1>Sign In User Name and password</h1>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          User Name
          <input type="text"
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

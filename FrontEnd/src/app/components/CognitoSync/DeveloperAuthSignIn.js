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
import appConfig from "../../utils/config";
import * as service from '../../utils/databaseFunctions';
import style from './style.css';
//import { push } from 'react-router-redux';

import { connect } from 'react-redux';
import { login } from '../../actions/AuthActions'

//React.Component is abstract base class
//DeveloperAuthSignIn is a subclass of React.Component
class DeveloperAuthSignIn extends React.Component{

  //Mounting function, called when component is created and inserted into DOM
  //Called before component is mounted
  constructor(props) {
    super(props);

    //The state holds the relevant information a user can enter
    //when signing in via Developer Authentication
    this.state = {
      email: '',
      password: ''
    };
  }



  //Fucntion called when the signIn form is submited by user
  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();

    console.log('email + ' + email);
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
      Username: email,
      Password: password,
    };

    var authDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authData);

    const poolData = {
      UserPoolId: appConfig.userPoolId,
      ClientId: appConfig.clientId,
    };

    var userPool = new CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var userData = {
        Username : email,
        Pool : userPool
    };

    var cognitoUser = new CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());

            let loginsIdpData = {};
            let loginsCognitoKey = 'cognito-idp.us-east-1.amazonaws.com/' + appConfig.userPoolId
            loginsIdpData[loginsCognitoKey] = result.getIdToken().getJwtToken();

            config.credentials = new CognitoIdentityCredentials({
              IdentityPoolId: appConfig.identityPoolId,
              Logins: loginsIdpData
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
              else{
                var id = config.credentials._identityId;
                var user1 = {
                  Logins: loginsIdpData,
                  IdentityId: id
                };

                var response;

                service.getUserByEmail(email, user1).then(function(response){
                  console.log("RESPONSE ");
                  console.log(response.data);
                  console.log(response.status);

                  if(response.data.email == email){
                    service.updateExistingUser(response.data.id_users, user1).then(function(response){
                      console.log("RESPONSE ");
                      console.log(response.data);
                      console.log(response.status);

                      var name = response.data.first_name + " " + response.data.last_name;

                      //authStore.login(name, id, response.data.id_users, loginsIdpData, "Developer");

                      config.credentials.clearCachedId();

                      //move to explore page
                      //window.location.assign('../Settings');
                    });
                  }
                });
              }
            });
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

    );
  }
  _login(username, password) {
    this.props.dispatch(login());
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(DeveloperAuthSignIn);

/**
 * Authentication lib
 * @type {Object}
 */

import { config, CognitoIdentityCredentials, CognitoIdentityServiceProvider } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import appConfig from "./config";
import * as service from './databaseFunctions';

var cognitoFunctions = {
  /**
   * Logs a user in
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(username, password, callback) {
    // If there is a token in the localStorage, the user already is authenticated
    if (this.loggedIn()) {
      callback(true);
      return;
    }

    console.log('username + ' + username);
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
      Username: username,
      Password: password,
    };

    var authDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authData);

    const poolData = {
      UserPoolId: appConfig.userPoolId,
      ClientId: appConfig.clientId,
    };

    var userPool = new CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var userData = {
        Username : username,
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

                service.getUserByEmail(username, user1).then(function(response){
                  console.log("RESPONSE ");
                  console.log(response.data);
                  console.log(response.status);

                  if(response.data.email == username){
                    service.updateExistingUser(response.data.id_users, user1).then(function(response){
                      console.log("RESPONSE ");
                      console.log(response.data);
                      console.log(response.status);

                      var name = response.data.first_name + " " + response.data.last_name;

                      //authStore.login(name, id, response.data.id_users, loginsIdpData, "Developer");

                      config.credentials.clearCachedId();

                      //move to explore page
                      localStorage.token = response.token;
                      callback(true);
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

    // Post a fake request (see below)
    /*request.post('/login', { username, password }, (response) => {
      // If the user was authenticated successfully, save a random token to the
      // localStorage
      if (response.authenticated) {
        localStorage.token = response.token;
        callback(true);
      } else {
        // If there was a problem authenticating the user, show an error on the
        // form
        callback(false, response.error);
      }
    });*/
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    //TODO call logout stuff
    //config.credentials.clearCachedId();
    callback(true);
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    if( localStorage.token == null) {
      return false;
    }
    else {
      return true;
    }
  },
  /**
   * Registers a user in the system
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  register(username, password, callback) {
    // Post a fake request
    /*request.post('/register', { username, password }, (response) => {
      // If the user was successfully registered, log them in
      if (response.registered === true) {
        this.login(username, password, callback);
      } else {
        // If there was a problem registering, show the error
        callback(false, response.error);
      }
    });*/
  },
  onChange() {}
}

module.exports = cognitoFunctions;

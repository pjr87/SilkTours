/**
 * Authentication lib
 * @type {Object}
 */

 import { config, CognitoIdentityCredentials, CognitoIdentityServiceProvider } from "aws-sdk";
 import {
   CognitoUserPool,
   CognitoUserAttribute
 } from "amazon-cognito-identity-js";
 import appConfig from "../utils/config";
 import * as service from '../utils/databaseFunctions';
 import { loadState, saveState } from '../localStorage';

 const userPool = new CognitoUserPool({
   UserPoolId: appConfig.userPoolId,
   ClientId: appConfig.clientId,
 });

/**
* Sets the cookies for authentication
* param: Logins, identityId, days
*/
/*function setCookie(Logins, identityId, days){
 var expires = "";
 if (days) {
     var date = new Date();
     date.setTime(date.getTime() + (days*24*60*60*1000));
     expires = "; expires=" + date.toUTCString();
 }
 document.cookie = "Logins=" + JSON.stringify(Logins) + expires + "; path=/";
 document.cookie = "IdentityId=" + identityId + expires + "; path=/";
}*/

var cognitoFunctions = {
  /**
   * Logs a user in
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(username, password, callback) {
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

    //Attempt to login
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (result) {

        //If successful build login value
        let loginsIdpData = {};
        let loginsCognitoKey = 'cognito-idp.us-east-1.amazonaws.com/' + appConfig.userPoolId
        loginsIdpData[loginsCognitoKey] = result.getIdToken().getJwtToken();

        //Set credentials
        config.credentials = new CognitoIdentityCredentials({
          IdentityPoolId: appConfig.identityPoolId,
          Logins: loginsIdpData
        });

        // set region if not set (as not set by the SDK by default)
        config.update({
          credentials: config.credentials,
          region: appConfig.region
        });

        //Get credentials to retrieve IdentityId
        config.credentials.get(function(err){
          if (err) {
            if (callback) callback({
              authenticated: false,
              error: "General Database Error"
            });
          }
          else{
            //Get the actual IdentityId
            var id = config.credentials._identityId;
            var auth = {
              Logins: JSON.stringify(loginsIdpData),
              IdentityId: id
            };

            var response;

            //Get the user that is tyring to login from database
            service.getUserByEmail(username, auth).then(function(response){
              //If the user matches then proceed
              if(response.data.email == username){
                var user = {
                  id_user: response.data.id_users,
                  provider: "Developer",
                  auth: auth
                };

                //Pass callback information to calling function
                if (callback) callback({
                  authenticated: true,
                  user: user,
                  data: response.data,
                  error: ""
                });
              }
              else{
                console.log("database-error");
                //Pass callback information to calling function
                if (callback) callback({
                  authenticated: false,
                  error: "General Database Error"
                });
              }
            });
          }
        });
      },
      onFailure: function(err) {
        //Pass callback information to calling function
        if (callback) callback({
          authenticated: false,
          error: err
        });
      },
      mfaRequired: function(codeDeliveryDetails) {
          var verificationCode = prompt('Please input verification code' ,'');
          cognitoUser.sendMFACode(verificationCode, this);
      }
    });
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    //TODO logout stuff
    callback(true);
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {

    const persistedState = loadState();
    if(persistedState == null){
      console.log("Set False");
      return false;
    }
    else{
      if( persistedState.AuthReducer.auth.IdentityId == ""){
        console.log("Set false 1");
        return false;
      }
      else {
        console.log("Set true");
        return true;
      }
    }
  },
  /**
   * Signs up a user in the system
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {string}   phoneNumber The phoneNumber of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  signup(username, password, phoneNumber, callback) {
    //Step 2 - Signing up Users to the User Pool for Silk
    //attributeList represents the reqiured or optional
    //attributes a user can use to sign up for an account
    const attributeList = [];

    var attributeEmail = new CognitoUserAttribute({
        Name: 'email',
        Value: username,
      });
    var attributePhoneNumber = new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phoneNumber,
      });

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    var err;

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        if (callback) callback({
          authenticated: false,
          error: err
        });
      }
      else{
        if (callback) callback({
          authenticated: true,
          cognitoUser: result.user,
          error: ""
        });
      }
    });
  },
  /**
   * Signs up a user in the system
   * @param  {object}   cognitoUser The cognitoUser of the user
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {string}   phoneNumber The phoneNumber of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  confirmSignUp(cognitoUser, firstname, lastname, username, password, phoneNumber, confirmationNumber, callback) {
    cognitoUser.confirmRegistration(confirmationNumber, true, function(err, result) {
      if (err) {
        if (callback) callback({
          authenticated: false,
          error: err
        });
      }
      else{
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
              console.log('access token + ' + result.getIdToken().getJwtToken());

              //If successful build login value
              let loginsIdpData = {};
              let loginsCognitoKey = 'cognito-idp.us-east-1.amazonaws.com/' + appConfig.userPoolId
              loginsIdpData[loginsCognitoKey] = result.getIdToken().getJwtToken();

              //Set credentials
              config.credentials = new CognitoIdentityCredentials({
                IdentityPoolId: appConfig.identityPoolId,
                Logins: loginsIdpData
              });

              // set region if not set (as not set by the SDK by default)
              config.update({
                credentials: config.credentials,
                region: appConfig.region
              });

              //Get credentials to retrieve IdentityId
              config.credentials.get(function(err){
                if (err) {
                  alert(err);
                  if (callback) callback({
                    authenticated: false,
                    error: err
                  });
                }
                else{
                  var id = config.credentials._identityId;
                  var auth = {
                    Logins: loginsIdpData,
                    IdentityId: id
                  };
                  var user1 = {
                    first_name: firstname,
                    last_name: lastname,
                    phone_number: phoneNumber,
                    email: username,
                    Logins: loginsIdpData,
                    IdentityId: id
                  };
                  var response;
                  // TODO check if user already exists, then user already signed in
                  //with another provider
                  var user = {
                    Logins: loginsIdpData,
                    IdentityId: id
                  };

                  //Get the user that is tyring to login from database TODO
                  /*service.getUserByEmail(username, user).then(function(response){
                    //If the user matches then proceed
                    if(response.data.email == username){
                      //TODO clear user from cognito
                      if (callback) callback({
                        authenticated: false,
                        error: 'User account logged in with another provider'
                      });
                    }
                    else{*/
                      service.registerNewUser(user1).then(function(response){
                        console.log("RESPONSE ");
                        console.log(response.data);
                        console.log(response.status);

                        if(response.data.email == username){
                          //config.credentials.clearCachedId();

                          if (callback) callback({
                            authenticated: true,
                            auth: auth,
                            id_user: response.data.id_users,
                            data: response.data,
                            error: ''
                          });
                        }
                      });
                  //  } TODO
                //  });
                }
            });
          }
        });
      }
    });
  },
  onChange() {}
}

module.exports = cognitoFunctions;

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

 const userPool = new CognitoUserPool({
   UserPoolId: appConfig.userPoolId,
   ClientId: appConfig.clientId,
 });

/**
* Sets the cookies for authentication
* param: Logins, identityId, days
*/
function setCookie(Logins, identityId, days){
 var expires = "";
 if (days) {
     var date = new Date();
     date.setTime(date.getTime() + (days*24*60*60*1000));
     expires = "; expires=" + date.toUTCString();
 }
 document.cookie = "Logins=" + JSON.stringify(Logins) + expires + "; path=/";
 document.cookie = "IdentityId=" + identityId + expires + "; path=/";
 //document.cookie="Logins="+JSON.stringify(Logins);
 //document.cookie="IdentityId="+identityId;
}

/**
* Gets the cookies for authentication
*/
function getCookie(name){
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for(var i=0;i < ca.length;i++) {
     var c = ca[i];
     while (c.charAt(0)==' ') c = c.substring(1,c.length);
     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
 }
 return null;
}

/**
* Removes the cookies for authentication
*/
function eraseCookie() {
   createCookie(null,null,-1);
}

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

        //Get credentials to retrieve identityID
        config.credentials.get(function(err){
          if (err) {
            console.log("err", err);
            if (callback) callback({
              authenticated: false,
              error: "General Database Error"
            });
          }
          else{
            //Get the actual IdentityID
            var id = config.credentials._identityId;
            /*var user1 = {
              Logins: loginsIdpData,
              IdentityId: id
            };*/

            //Set the cookie used to authenticate with server
            setCookie(loginsIdpData, id, 1);

            var response;

            //Get the user that is tyring to login from database
            service.getUserByEmail(username).then(function(response){
              console.log("response", response);
              //If the user matches then proceed
              if(response.data.email == username){
                //Update database table with new login information TODO not neccesary
                //service.updateExistingUser(response.data.id_users).then(function(response){
                var name = response.data.first_name + " " + response.data.last_name;

                var user = {
                  fullName: name,
                  email: username,
                  id_user: response.data.id_users,
                  provider: "Developer"
                };

                //Pass callback information to calling function
                if (callback) callback({
                  authenticated: true,
                  user: user,
                  error: ""
                });
                //});
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
    //TODO call logout stuff
    //config.credentials.clearCachedId();
    callback(true);
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    //TODO use cookie for login
    if( localStorage.token == null) {
      return false;
    }
    else {
      return true;
    }
  },
  /**
   * Signs up a user in the system
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
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
        console.log(err);
        if (callback) callback({
          authenticated: false,
          error: err
        });
      }
      else{
        if (callback) callback({
          authenticated: true,
          error: ""
        });
      }
    });
  },
  onChange() {}
}

module.exports = cognitoFunctions;

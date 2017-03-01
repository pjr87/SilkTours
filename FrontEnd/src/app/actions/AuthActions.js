/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import {
  SET_AUTH,
  UPDATE_USER,
  CHANGE_FORM,
  UPDATE_AUTH,
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR
} from '../constants/AuthConstants';
import * as errorMessages  from '../constants/MessageConstants';
import cognitoFunctions from '../utils/cognitoFunctions';
import { browserHistory } from 'react-router';

import { config, CognitoIdentityCredentials, CognitoIdentityServiceProvider } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import appConfig from "../utils/config";
import * as service from '../utils/databaseFunctions';

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ username, password })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }

    if (cognitoFunctions.loggedIn()) {
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

                      var user = {
                        fullName: name,
                        email: username,
                        id_user: response.data.id_users,
                        provider: "Developer"
                      };
                      console.log("user", user);
                      dispatch(updateUserState(user));
                      dispatch(updateLoginsState(user1));

                      config.credentials.clearCachedId();

                      //move to explore page
                      localStorage.token = response.token;

                      // When the request is finished, hide the loading indicator
                      dispatch(sendingRequest(false));
                      dispatch(setAuthState(true));

                      // If the login worked, forward the user to home and clear the form
                      dispatch(changeForm({
                        username: "",
                        password: ""
                      }));
                      forwardTo('/');
                    });
                  }
                });
              }
            });
        },
        onFailure: function(err) {
            alert(err);
            //TODO implement error types
            switch (err.type) {
              case 'user-doesnt-exist':
                dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
                return;
              case 'password-wrong':
                dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
                return;
              default:
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
                return;
            }
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
  }
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    cognitoFunctions.logout((success, err) => {
      if (success === true) {
        dispatch(sendingRequest(false))
        dispatch(setAuthState(false));
        localStorage.removeItem('token')
        browserHistory.push('/');
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}

/**
 * Registers a user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 */
export function register(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ username, password })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }
    // Generate salt for password encryption
    const salt = genSalt(username);
    // Encrypt password
    bcrypt.hash(password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        return;
      }
      // Use cognitoFunctions.js to fake a request
      cognitoFunctions.register(username, hash, (success, err) => {
        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));
        if (success) {
          // If the register worked, forward the user to the homepage and clear the form
          forwardTo('/dashboard');
          dispatch(changeForm({
            username: "",
            password: ""
          }));
        } else {
          switch (err.type) {
            case 'username-exists':
              dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
      });
    });
  }
}

/**
 * Updates a user's information
 * @param  {object} newUserState //The user json
 */
export function updateUserState(newUserState) {
  console.log("newUserState", newUserState);
  return { type: UPDATE_USER, newUserState };
}

/**
 * Updates a user's information
 * @param  {object} newLoginsState //The user json
 */
export function updateLoginsState(newLoginsState) {
  console.log("newLoginsState", newLoginsState);
  return { type: UPDATE_AUTH, newLoginsState };
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newAuthState) {
  return { type: SET_AUTH, newAuthState };
}

/**
 * Sets the form state
 * @param  {object} newLoginFormState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newLoginFormState) {
  return { type: CHANGE_FORM, newLoginFormState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}


/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: SET_ERROR_MESSAGE, message });

    /*const form = document.querySelector('.form-page__form-wrapper');
    if (form) {
      form.classList.add('js-form__err-animation');
      // Remove the animation class after the animation is finished, so it
      // can play again on the next error
      setTimeout(() => {
        form.classList.remove('js-form__err-animation');
      }, 150);

      // Remove the error message after 3 seconds
      setTimeout(() => {
        dispatch({ type: SET_ERROR_MESSAGE, message: '' });
      }, 3000);
    }*/
    // Remove the error message after 3 seconds
    setTimeout(() => {
      dispatch({ type: SET_ERROR_MESSAGE, message: '' });
    }, 3000);
  }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  console.log('forwardTo(' + location + ')');
  browserHistory.push(location);
}


/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return {type: CLEAR_ERROR}
}

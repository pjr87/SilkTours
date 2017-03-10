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

import * as authConstants from '../constants/AuthConstants';
import * as errorMessages from '../constants/MessageConstants';
import cognitoFunctions from '../utils/cognitoFunctions';
import * as service from '../utils/databaseFunctions';
import { browserHistory } from 'react-router';

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
      console.log("Logged In");
      return;
    }

    // Do a login
    cognitoFunctions.login(username, password, (response) => {
      // If the user was authenticated successfully set states
      if (response.authenticated) {
        //Update the store with relevant information
        dispatch(updateIDState(response.user.id_user));
        dispatch(updateProviderState("Developer"));
        dispatch(updateAuthState(response.user.auth));
        dispatch(updateUserState(response.data));

        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(true));

        // If the login worked, forward the user to home and clear the form
        dispatch(changeLoginForm({
          username: "",
          password: ""
        }));
        dispatch(clearError());
        forwardTo('/');
      } else {
        // If there was a problem authenticating the user, show an error on the
        // form
        //TODO error handling
        //TODO implement error types
        dispatch(sendingRequest(false));
        switch (response.error) {
          case 'user-doesnt-exist':
            dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
            return;
          case 'password-wrong':
            dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
            return;
          case 'database-error':
            dispatch(setErrorMessage(errorMessages.DATABASE_ERROR));
            return;
          default:
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
            return;
        }
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
        //Update the store with relevant information
        dispatch(updateIDState(""));
        dispatch(updateProviderState(""));
        dispatch(updateAuthState({
          Logins: '',
          IdentityId: ''
        }));
        dispatch(updateUserState({
          address: {
            city: "",
            country: "",
            state_code: "",
            street: "",
            unit: "",
            zip: ""
          },
          description: "",
          dob: "",
          email: "",
          first_name: "",
          interests: [],
          last_name: "",
          phone_number: "",
          profile_picture: "",
          tours_taking: [],
          tours_teaching: [],
        }));

        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(false));

        // If the login worked, forward the user to home and clear the form
        dispatch(changeLoginForm({
          username: "",
          password: ""
        }));
        dispatch(changeSignUpForm({
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          phoneNumber: '',
          confirmationCode: ''
        }));
        dispatch(clearError());
        browserHistory.push('/');
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        dispatch(sendingRequest(false));
      }
    });
  }
}

/**
 * Registers a user
 * @param  {string} firstname The username of the new user
 * @param  {string} lastname The password of the new user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 * @param  {string} phoneNumber The phoneNumber of the new user
 */
export function signUp(firstname, lastname, username, password, phoneNumber) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ firstname, lastname, username, password, phoneNumber })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }

    //Remove all non-digit characters except + for international numbers
    phoneNumber = phoneNumber.replace(/[^\d\+]/g,"");

    //Add proper format to phone number
    if(phoneNumber.length == 10){
      var tmp = '+1' + phoneNumber;
      phoneNumber = tmp;
      console.log("Phone number is " + phoneNumber);
    }
    else if (phoneNumber.length == 12){
      console.log("Phone number is " + phoneNumber);
    }
    else{
      dispatch(setErrorMessage(errorMessages.PHONE_NUMBER_INVALID));
      dispatch(sendingRequest(false));
      return;
    }

    cognitoFunctions.signup(username, password, phoneNumber, (response) => {
      // If the user was signed up successfully
      if (response.authenticated) {
        //Update the store with relevant information
        dispatch(updateProviderState("Developer"));
        //dispatch(updateUserState(response.data));
        dispatch(setCognitoUser(response.cognitoUser));

        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setConfirmed(true));

        dispatch(clearError());
        forwardTo('/confirmationpage');
      }
      else{
        // If there was a problem signin up the user, show an error
        dispatch(sendingRequest(false));
        console.log('response.error:', String(response.error));
        if(response.error == "UsernameExistsException: User already exists"){
          dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
          return;
        }
        else{
          dispatch(setErrorMessage(errorMessages.SIGNUP_FAILED));
          return;
        }
      }
    });
  }
}

/**
 * Registers a user
 * @param  {object} cognitoUser The user to do confirmation of
 * @param  {string} confirmationNumber The confirmation number
 */
export function confirmSignUp(cognitoUser, firstname, lastname, username, password, phoneNumber, confirmationNumber) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ cognitoUser, firstname, lastname, username, phoneNumber, confirmationNumber })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }

    cognitoFunctions.confirmSignUp(cognitoUser, firstname, lastname, username, password, phoneNumber, confirmationNumber, (response) => {
      // If the user was signed up successfully
      if (response.authenticated) {
        //Update the store with relevant information
        dispatch(updateProviderState("Developer"));
        dispatch(updateAuthState(response.auth));
        dispatch(updateIDState(response.id_user));
        dispatch(updateUserState(response.data));

        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setConfirmed(false));
        dispatch(setAuthState(true));

        // If the login worked, forward the user to home and clear the form
        dispatch(changeSignUpForm({
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          phoneNumber: '',
          confirmationCode: ''
        }));

        dispatch(clearError());
        forwardTo('/');
      }
      else{
        // If there was a problem signin up the user, show an error
        console.log('response.error: ' + response.error);
        dispatch(sendingRequest(false));
        if(response.error == "UsernameExistsException: User already exists"){
          dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
          return;
        }
        else if(response.error == "User account logged in with another provider"){
          dispatch(setErrorMessage(errorMessages.OTHER_PROVIDER));
          return;
        }
        else{
          dispatch(setErrorMessage(errorMessages.SIGNUP_FAILED));
          return;
        }
      }
    });
  }
}

/**
 * Updates a user in database
 * @param  {object} user The user to update
 */
export function updateUser(id_user, user, auth) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ id_user, user, auth })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }

    service.updateExistingUser(id_user, user, auth).then(function(response){
      if(response.data){
        console.log("response.data", response.data);
        dispatch(updateUserState(response.data));
        dispatch(sendingRequest(false));
      }
      else{
        // If there was a problem, show an error
        console.log('response.error: ' + response.error);
        dispatch(sendingRequest(false));
        dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
      }
    });
  }
}

/**
 * Updates a user's information
 * @param  {object} newUserState //The user json
 */
export function updateUserState(newUserState) {
  return { type: authConstants.UPDATE_USER, newUserState };
}

/**
 * Updates a user's address information
 * @param  {object} newAddressState //The user json
 */
export function updateAddressState(newAddressState) {
  return { type: authConstants.UPDATE_ADDRESS, newAddressState };
}

/**
 * Updates a user's information
 * @param  {object} newIDState //The user json
 */
export function updateIDState(newIDState) {
  return { type: authConstants.UPDATE_ID, newIDState };
}

/**
 * Updates a user's information
 * @param  {object} newProviderState //The user json
 */
export function updateProviderState(newProviderState) {
  return { type: authConstants.UPDATE_PROVIDER, newProviderState };
}

/**
 * Updates a user's information TODO remove this
 * @param  {object} newAuthState //The auth json
 */
export function updateAuthState(newAuthState) {
  return { type: authConstants.UPDATE_AUTH, newAuthState };
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newAuthState) {
  return { type: authConstants.SET_AUTH, newAuthState };
}

/**
 * Sets the cognito user object
 * @param {object} newCognitoUserState Cognito User used to confirm signup
 */
export function setCognitoUser(newCognitoUserState) {
  return { type: authConstants.SET_COGNITO_USER, newCognitoUserState };
}

/**
 * Sets the form state
 * @param  {object} newLoginFormState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeLoginForm(newLoginFormState) {
  return { type: authConstants.CHANGE_LOGIN_FORM, newLoginFormState };
}

/**
 * Sets the form state
 * @param  {object} newSignUpFormState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeSignUpForm(newSignUpFormState) {
  return { type: authConstants.CHANGE_SIGNUP_FORM, newSignUpFormState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: authConstants.SENDING_REQUEST, sending };
}

/**
 * Sets the newConfirmedState state, which allows user to enter confirmation info
 * @param  {boolean} newConfirmedState The new state of confirmation
 * @return {object}          Formatted action for the reducer to handle
 */
export function setConfirmed(newConfirmedState) {
  return { type: authConstants.SET_CONFIRMED, newConfirmedState };
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: authConstants.SET_ERROR_MESSAGE, message });
  }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
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
  return {type: authConstants.CLEAR_ERROR}
}

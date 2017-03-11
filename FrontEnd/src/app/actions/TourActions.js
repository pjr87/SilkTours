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

import * as tourConstants from '../constants/TourConstants';
import * as errorMessages from '../constants/MessageConstants';
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
  }
}

/**
 * Create a Tour in the database
 * @param  {object} tour The tour to create
 */
export function createTour(tour, auth) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ tour, auth })) {
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
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateTourState(newTourState) {
  return { type: tourConstants.UPDATE_USER, newUserState };
}

/**
 * Updates a user's address information
 * @param  {object} newAddressState //The user json
 */
export function updateAddressState(newAddressState) {
  return { type: tourConstants.UPDATE_TOUR_ADDRESS, newAddressState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: tourConstants.SENDING_REQUEST, sending };
}

/**
 * Sets the newConfirmedState state, which allows user to enter confirmation info
 * @param  {boolean} newConfirmedState The new state of confirmation
 * @return {object}          Formatted action for the reducer to handle
 */
export function setConfirmed(newConfirmedState) {
  return { type: tourConstants.SET_CONFIRMED, newConfirmedState };
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: tourConstants.SET_ERROR_MESSAGE, message });
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
  return {type: tourConstants.CLEAR_ERROR}
}

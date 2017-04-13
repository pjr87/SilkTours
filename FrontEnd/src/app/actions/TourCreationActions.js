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

import * as tourCreationConstants from '../constants/TourCreationConstants';
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

 function toHHMMSS(sec_num) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

export function buildTourEvent(startTime, endTime, startDay, endDay, tourId, guideId){
  var start = startDay + " " + toHHMMSS(startTime);
  var end = endDay + " " + toHHMMSS(endTime);

  var tourEvent = {
    end_date_time: start,
    id_tour: tourId,
    id_guide: guideId,
    start_date_time: end,
    state: "A"
  };

  return tourEvent;
}

/**
 * Create a Tour in the database
 * @param  {object} tour The tour to create
 */
export function createTour(tour, auth, photos, startTime, endTime) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ tour, auth, photos, startTime, endTime })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }

    console.log("photos", photos);

    service.newTour(tour, auth).then(function(response){
      if(response.data){
        console.log("response.data", response.data.id_tour);
        if(photos.length > 0){
          service.newPhoto(photos, response.data.id_tour, auth).then(function(response){
            if(response.data){
              var tourEvent = buildTourEvent(
                startTime,
                endTime,
                tour.firstStart_date,
                tour.lastEnd_date,
                response.data.id_tour,
                tour.guides[0].id_user);
              console.log('tourEvent', tourEvent);
              service.putTourEvent(tourEvent, auth).then(function(response){
                if(response.data){
                  dispatch(sendingRequest(false));
                  forwardTo('/explore');
                  dispatch(clearTour())
                  dispatch(updatePhotoState([]))
                  dispatch(setTabKey("info"))
                }
                else{
                  // If there was a problem, show an error
                  console.log('response.error: ' + response.error);
                  dispatch(sendingRequest(false));
                  dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
                }
              });
            }
            else{
              // If there was a problem, show an error
              console.log('response.error: ' + response.error);
              dispatch(sendingRequest(false));
              dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
            }
          });
        }
        else{
          if(response.data){
            var tourEvent = buildTourEvent(
              startTime,
              endTime,
              tour.firstStart_date,
              tour.lastEnd_date,
              response.data.id_tour,
              tour.guides[0].id_user);
            console.log('tourEvent', tourEvent);
            service.putTourEvent(tourEvent, auth).then(function(response){
              if(response.data){
                dispatch(sendingRequest(false));
                forwardTo('/explore');
                dispatch(clearTour())
                dispatch(updatePhotoState([]))
                dispatch(setTabKey("info"))
              }
              else{
                // If there was a problem, show an error
                console.log('response.error: ' + response.error);
                dispatch(sendingRequest(false));
                dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
              }
            });
          }
          else{
            // If there was a problem, show an error
            console.log('response.error: ' + response.error);
            dispatch(sendingRequest(false));
            dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
          }
        }
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
 * Adds a guide to the tour
 * @param  {object} user The user to add
 */
export function addGuide(user) {
  return (dispatch) => {
    if (anyElementsEmpty({ user })) {
      console.log("error", user);
      return;
    }

    var newGuide = {
      first_name: user.first_name,
      id_tour: '',
      id_tour_guide: '',
      id_user: user.id_user,
      last_name: user.last_name,
    }

    console.log("newGuide", newGuide);

    dispatch(updateGuideState(newGuide));
  }
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateTourState(newTourState) {
  return { type: tourCreationConstants.UPDATE_TOUR, newTourState };
}

/**
 * Updates a tour's information
 * @param  {object} newGuideState //The user json
 */
export function updateGuideState(newGuideState) {
  return { type: tourCreationConstants.UPDATE_TOUR_GUIDE, newGuideState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateLanguageState(newLanguageState) {
  return { type: tourCreationConstants.UPDATE_TOUR_LANGUAGE, newLanguageState };
}

/**
 * Updates a tour's photo
 * @param  {object} newTourState //The user json
 */
export function updatePhotoState(newPhotoState) {
  return { type: tourCreationConstants.UPDATE_TOUR_PHOTO, newPhotoState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateAdditionalState(newAdditionalState) {
  return { type: tourCreationConstants.UPDATE_TOUR_ADDITIONAL, newAdditionalState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updatePriceState(newPriceState) {
  return { type: tourCreationConstants.UPDATE_TOUR_PRICE, newPriceState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateStopState(newStopsState) {
  return { type: tourCreationConstants.UPDATE_TOUR_STOPS, newStopsState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateInterestState(newInterestState) {
  return { type: tourCreationConstants.UPDATE_TOUR_INTEREST, newInterestState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateNameState(newNameState) {
  return { type: tourCreationConstants.UPDATE_TOUR_NAME, newNameState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateTimeState(newTimeState) {
  return { type: tourCreationConstants.UPDATE_TOUR_TIME, newTimeState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function updateDescriptionState(newDescriptionState) {
  return { type: tourCreationConstants.UPDATE_TOUR_DESCRIPTION, newDescriptionState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function setStartTime(newStartState) {
  return { type: tourCreationConstants.SET_START_TIME, newStartState };
}

/**
 * Updates a tour's information
 * @param  {object} newTourState //The user json
 */
export function setEndTime(newEndState) {
  return { type: tourCreationConstants.SET_END_TIME, newEndState };
}

/**
 * Updates a user's address information
 * @param  {object} newAddressState //The user json
 */
export function updateAddressState(newAddressState) {
  return { type: tourCreationConstants.UPDATE_TOUR_ADDRESS, newAddressState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: tourCreationConstants.SENDING_REQUEST, sending };
}

/**
 * Sets the newConfirmedState state, which allows user to enter confirmation info
 * @param  {boolean} newConfirmedState The new state of confirmation
 * @return {object}          Formatted action for the reducer to handle
 */
export function setConfirmed(newConfirmedState) {
  return { type: tourCreationConstants.SET_CONFIRMED, newConfirmedState };
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
export function setTabKey(newTabKeyState) {
  return { type: tourCreationConstants.UPDATE_TAB_KEY, newTabKeyState };
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: tourCreationConstants.SET_ERROR_MESSAGE, message });
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
  return {type: tourCreationConstants.CLEAR_ERROR}
}

/**
 * Sets the `error` state as empty
 */
export function clearTour () {
  return {type: tourCreationConstants.CLEAR_TOUR}
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  browserHistory.push(location);
}

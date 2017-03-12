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

import * as tourDetailConstants from '../constants/TourDetailConstants';
import * as errorMessages from '../constants/MessageConstants';
import * as service from '../utils/databaseFunctions';
import { browserHistory } from 'react-router';

/**
 * Selects a tour
 * @param  {Integer} tourId The selected tour id
 */
export function selectTour(tourId) {
  return (dispatch) => {
    if (tourId == "" || tourId == undefined || tourId == null) {
      browserHistory.push('/notfound');
      return;
    }
    dispatch(updateTourId(tourId));
    try {
      service.getTourById(tourId).then(function(response){
        if(response.data){
          console.log("getTourById", response.data);
          dispatch(setSelectedTour(response.data));
          service.getTourEventById(tourId).then(function(response){
            if(response.data){
              console.log("getTourEventById", response.data);
              dispatch(updateTourDate(response.data));
              dispatch(setLoadedState(true));
            }
            else{
              // If there was a problem, show an error
              console.log('response.error: ' + response.error);
              //dispatch(sendingRequest(false));
              //dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
            }
          });
        }
        else{
          // If there was a problem, show an error
          console.log('response.error: ' + response.error);
          //dispatch(sendingRequest(false));
          //dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
        }
      });
    } catch(e) {
      console.log("error occured pulling tour data");
    }
  };
}

/**
 * Selects a tour
 * @param  {object} tour The selected tour
 */
export function setSelectedTour(newTourFormState) {
  return (dispatch) => {
    dispatch(updateTour(newTourFormState));
  };
}

/**
 * Selects a tour
 * @param  {object} tour The selected tour
 */
export function setSelectedDate(newTourDateFormState) {
  return (dispatch) => {
    dispatch(updateTourDate(newTourDateFormState));
  };
}

/**
 * Updates a user's selected tour id
 * @param  {Integer} selectedTourId
 */
export function updateTourId(newTourIdFormState) {
  return { type: tourDetailConstants.UPDATE_TOUR_ID, newTourIdFormState };
}

/**
 * Sets the loaded state for the tour
 * @param  {Integer} newLoadedState
 */
export function setLoadedState(newLoadedState) {
  return { type: tourDetailConstants.SET_LOADED, newLoadedState };
}

/**
 * Updates a selected tour information
 * @param  {object} tour
 */
export function updateTour(newTourFormState) {
  return { type: tourDetailConstants.UPDATE_SELECTED_TOUR, newTourFormState };
}

/**
 * Updates a selected tour information
 * @param  {object} tour
 */
export function updateTourDate(newTourDateFormState) {
  return { type: tourDetailConstants.UPDATE_SELECTED_TOUR_DATE, newTourDateFormState };
}

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
              const availableDates = response.data;
              dispatch(updateTourDates(availableDates));
              dispatch(updateTourDateId(availableDates[0].id_tourEvent.toString()));
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
 * @param  {string} date The selected tour
 */
export function setSelectedDateId(newTourDateIdFormState) {
  return (dispatch) => {
    dispatch(updateTourDateId(newTourDateIdFormState));
  };
}

/**
 * Selects a tour
 * @param  {string} startDate The selected tour
 */
export function setSelectedDateStart(newTourDateStartFormState) {
  return (dispatch) => {
    dispatch(updateTourDateStart(newTourDateStartFormState));
  };
}

/**
 * Selects a tour
 * @param  {string} endDate The selected tour
 */
export function setSelectedDateEnd(newTourDateEndFormState) {
  return (dispatch) => {
    dispatch(updateTourDateEnd(newTourDateEndFormState));
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
 * Updates a selected tour dates
 * @param  {object} tourEvent
 */
export function updateTourDates(newTourDatesState) {
  return { type: tourDetailConstants.UPDATE_TOUR_DATES, newTourDatesState };
}

/**
 * Updates a selected tour information
 * @param  {string} tourId
 */
export function updateTourDateId(newTourDateIdFormState) {
  return { type: tourDetailConstants.UPDATE_SELECTED_TOUR_DATE_ID, newTourDateIdFormState };
}

/**
 * Updates a selected tour information
 * @param  {string} tourStartDate
 */
export function updateTourDateStart(newTourDateStartFormState) {
  return { type: tourDetailConstants.UPDATE_SELECTED_TOUR_DATE_START, newTourDateStartFormState };
}

/**
 * Updates a selected tour information
 * @param  {string} tourStartDate
 */
export function updateTourDateEnd(newTourDateEndFormState) {
  return { type: tourDetailConstants.UPDATE_SELECTED_TOUR_DATE_END, newTourDateEndFormState };
}

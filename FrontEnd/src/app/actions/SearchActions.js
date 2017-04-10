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

import * as searchConstants from '../constants/SearchConstants';
import * as errorMessages from '../constants/MessageConstants';
import * as service from '../utils/databaseFunctions';
import { browserHistory } from 'react-router';

/**
 * Selects a searched tour
 * @param  {String} keywords The search keywords
 * @param  {String} interests The search interests
 * @param  {Integer} rating The search rating
 * @param  {Integer} priceMin The search priceMin
 * @param  {Integer} priceMax The search priceMax
 * @param  {String} city The search city
 */
export function searchTour(rating, priceMin, priceMax, keywords, interests, city) {
  return (dispatch) => {
    try {
      service.getFilteredTours(rating, priceMin, priceMax, keywords).then(function(response){
        if(response.data){
          console.log("getSearchTour", response.data.data);
          const tours = response.data.data;
          dispatch(setSelectedTours(tours));
          dispatch(setLoadedState(true));
        }
        else{
          // If there was a problem, show an error
          console.log('response.error: ' + response.error);
          dispatch(sendingRequest(false));
          dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
        }
      });
    } catch(e) {
      console.log("error occured pulling tour data");
    }
  };
}

/**
 * Selects a tours
 * @param  {string} tours The selected tours
 */
export function setSelectedTours(newSearchToursFormState) {
  return (dispatch) => {
    dispatch(updateSearchTours(newSearchToursFormState));
  };
}

/**
 * Selects a keywords
 * @param  {string} keywords The selected keywords
 */
export function setSelectedKeywords(newSearchKeywordsFormState) {
  return (dispatch) => {
    dispatch(updateSearchKeywords(newSearchKeywordsFormState));
  };
}

/**
 * Selects an interests
 * @param  {string} interests The selected interests
 */
export function setSelectedInterests(newSearchInterestsFormState) {
  return (dispatch) => {
    dispatch(updateSearchInterests(newSearchInterestsFormState));
  };
}

/**
 * Selects a rating
 * @param  {string} rating The selected rating
 */
export function setSelectedRating(newSearchRatingFormState) {
  return (dispatch) => {
    dispatch(updateSearchRating(newSearchRatingFormState));
  };
}

/**
 * Selects a priceMin
 * @param  {string} priceMin The selected priceMin
 */
export function setSelectedPriceMin(newSearchPriceMinFormState) {
  return (dispatch) => {
    dispatch(updateSearchPriceMin(newSearchPriceMinFormState));
  };
}

/**
 * Selects a priceMax
 * @param  {string} priceMax The selected priceMax
 */
export function setSelectedPriceMax(newSearchPriceMaxFormState) {
  return (dispatch) => {
    dispatch(updateSearchPriceMax(newSearchPriceMaxFormState));
  };
}

/**
 * Selects a city
 * @param  {string} city The selected city
 */
export function setSelectedCity(newSearchCityFormState) {
  return (dispatch) => {
    dispatch(updateSearchCity(newSearchCityFormState));
  };
}

/**
 * Updates a user's selected search tours
 * @param  {Integer} selectedTourId
 */
export function updateSearchTours(newSearchToursFormState) {
  return { type: searchConstants.SEARCH_TOURS, newSearchToursFormState };
}

/**
 * Updates a user's selected search keywords
 * @param  {Integer} selectedTourId
 */
export function updateSearchKeywords(newSearchKeywordsFormState) {
  return { type: searchConstants.SEARCH_KEY_WORD, newSearchKeywordsFormState };
}

/**
 * Updates a selected search tour interests
 * @param  {object} tour
 */
export function updateSearchInterests(newSearchInterestsFormState) {
  return { type: searchConstants.SEARCH_INTEREST, newSearchInterestsFormState };
}

/**
 * Updates a selected tour dates
 * @param  {object} tourEvent
 */
export function updateSearchRating(newSearchRatingFormState) {
  return { type: searchConstants.SEARCH_RATING, newSearchRatingFormState };
}

/**
 * Updates a selected search price min
 * @param  {object} tourEvent
 */
export function updateSearchPriceMin(newSearchPriceMinFormState) {
  return { type: searchConstants.SEARCH_MINIMUM_PRICE, newSearchPriceMinFormState };
}

/**
 * Updates a selected search price max
 * @param  {object} tourEvent
 */
export function updateSearchPriceMax(newSearchPriceMaxFormState) {
  return { type: searchConstants.SEARCH_MAXIMUM_PRICE, newSearchPriceMaxFormState };
}

/**
 * Updates a selected search city
 * @param  {object} tourEvent
 */
export function updateSearchCity(newSearchCityFormState) {
  return { type: searchConstants.SEARCH_CITY, newSearchCityFormState };
}

/**
 * Sets the loaded state for the tours
 * @param  {Integer} newLoadedState
 */
export function setLoadedState(newLoadedState) {
  return { type: searchConstants.SET_LOADED, newLoadedState };
}

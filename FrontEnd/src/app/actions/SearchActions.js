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
export function searchTour(rating, priceMin, priceMax, keywords, interests, city, page, page_size) {
  return (dispatch) => {
    // console.log('rating: ' + rating);
    // console.log('priceMin: ' + priceMin);
    // console.log('priceMax: ' + priceMax);
    // console.log('keywords: ' + keywords);
    // console.log('interests: ' + interests);
    // console.log('city: ' + city);
    // console.log('page: ' + page);
    // console.log('page_size: ' + page_size);
    try {
      service.getFilteredTours(rating, priceMin, priceMax, keywords, page, page_size).then(function(response){
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
 * Selects a page
 * @param  {string} page The selected page
 */
export function setSelectedPage(newSearchPageFormState) {
  return (dispatch) => {
    dispatch(updateSearchPage(newSearchPageFormState));
  };
}

/**
 * Selects a page size
 * @param  {string} pageSize The selected page size
 */
export function setSelectedPageSize(newSearchPageSizeFormState) {
  return (dispatch) => {
    dispatch(updateSearchPageSize(newSearchPageSizeFormState));
  };
}

/**
 * Updates a user's selected search tours
 * @param  {array} tours
 */
export function updateSearchTours(newSearchToursFormState) {
  return { type: searchConstants.SEARCH_TOURS, newSearchToursFormState };
}

/**
 * Updates a user's selected search keywords
 * @param  {String} keywords
 */
export function updateSearchKeywords(newSearchKeywordsFormState) {
  return { type: searchConstants.SEARCH_KEY_WORD, newSearchKeywordsFormState };
}

/**
 * Updates a selected search tour interests
 * @param  {String} interests
 */
export function updateSearchInterests(newSearchInterestsFormState) {
  return { type: searchConstants.SEARCH_INTEREST, newSearchInterestsFormState };
}

/**
 * Updates a selected tour dates
 * @param  {String} rating
 */
export function updateSearchRating(newSearchRatingFormState) {
  return { type: searchConstants.SEARCH_RATING, newSearchRatingFormState };
}

/**
 * Updates a selected search price min
 * @param  {String} priceMin
 */
export function updateSearchPriceMin(newSearchPriceMinFormState) {
  return { type: searchConstants.SEARCH_MINIMUM_PRICE, newSearchPriceMinFormState };
}

/**
 * Updates a selected search price max
 * @param  {String} priceMax
 */
export function updateSearchPriceMax(newSearchPriceMaxFormState) {
  return { type: searchConstants.SEARCH_MAXIMUM_PRICE, newSearchPriceMaxFormState };
}

/**
 * Updates a selected search city
 * @param  {String} city
 */
export function updateSearchCity(newSearchCityFormState) {
  return { type: searchConstants.SEARCH_CITY, newSearchCityFormState };
}

/**
 * Updates a selected search page
 * @param  {String} page
 */
export function updateSearchPage(newSearchPageFormState) {
  return { type: searchConstants.SEARCH_PAGE, newSearchPageFormState };
}

/**
 * Updates a selected search page size
 * @param  {String} pageSize
 */
export function updateSearchPageSize(newSearchPageSizeFormState) {
  return { type: searchConstants.SEARCH_PAGE_SIZE, newSearchPageSizeFormState };
}

/**
 * Sets the loaded state for the tours
 * @param  {Integer} newLoadedState
 */
export function setLoadedState(newLoadedState) {
  return { type: searchConstants.SET_LOADED, newLoadedState };
}

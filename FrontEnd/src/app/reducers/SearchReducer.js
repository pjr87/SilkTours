/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the SearchReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import * as searchConstants from '../constants/SearchConstants';

// The initial application state
const initialState = {
  keywords: '',
  interests: '',
  rating: '0',
  priceMin: '0',
  priceMax: '1000000',
  city: '',
  page: '1',
  page_size: '10',
  tours: [],
  isLoaded: false
};

// Takes care of changing the application state
function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case searchConstants.SEARCH_TOURS:
      return {...state, tours: action.newSearchToursFormState};
    case searchConstants.SEARCH_KEY_WORD:
      return {...state, keywords: action.newSearchKeywordsFormState};
    case searchConstants.SEARCH_INTEREST:
      return {...state, interests: action.newSearchInterestsFormState};
    case searchConstants.SEARCH_RATING:
      return {...state, rating: action.newSearchRatingFormState};
    case searchConstants.SEARCH_MINIMUM_PRICE:
      return {...state, priceMin: action.newSearchPriceMinFormState};
    case searchConstants.SEARCH_MAXIMUM_PRICE:
      return {...state, priceMax: action.newSearchPriceMaxFormState};
    case searchConstants.SEARCH_CITY:
      return {...state, city: action.newSearchCityFormState};
    case searchConstants.SEARCH_PAGE:
      return {...state, page: action.newSearchPageFormState};
    case searchConstants.SEARCH_PAGE_SIZE:
      return {...state, page_size: action.newSearchPageSizeFormState};
    case searchConstants.SET_LOADED:
      return {...state, isLoaded: action.newLoadedState};
    default:
      return state;
  }
}

export default SearchReducer;

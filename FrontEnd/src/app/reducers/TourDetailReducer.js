/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the TourDetailReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import * as tourDetailConstants from '../constants/TourDetailConstants';

// The initial application state
const initialState = {
  selectedTourId: '',
  selectedTour: {
    toutId: '',
    name: '',
    description: '',
    price: '',
    rating: '',
    maxGroupSize: '',
    minGroupSize: '',
    tourStartDate: '',
    tourEndDate: '',
    stops: [],
    guides: [],
    availableDates: [],
    addtionalAccomadation: '',
    addtionalFood: '',
    addtionalTransport: '',
    interests: [],
    profileImage: '',
    profileImageHeight: '',
    profileImageWidth: '',
    reviews: [],
    ratingCount: ''
  },
  selectedTourDate: '',
  isLoaded: false
};

// Takes care of changing the application state
function TourDetailReducer(state = initialState, action) {
  switch (action.type) {
    case tourDetailConstants.UPDATE_TOUR_ID:
      return {...state, selectedTourId: action.newTourIdFormState};
    case tourDetailConstants.SET_LOADED:
      return {...state, isLoaded: action.newLoadedState};
    case tourDetailConstants.UPDATE_SELECTED_TOUR:
      return {...state, selectedTour: action.newTourFormState};
    case tourDetailConstants.UPDATE_SELECTED_TOUR_DATE:
      return {...state, selectedTourDate: action.newTourDateFormState};
    default:
      return state;
  }
}

export default TourDetailReducer;

/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the tourReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import * as tourConstants from '../constants/TourDetailConstants';

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
  selectedTourDate: ''
};

// Takes care of changing the application state
function TourReducer(state = initialState, action) {
  switch (action.type) {
    case tourConstants.UPDATE_TOUR_ID:
      return {...state, selectedTourId: action.newTourIdFormState};
    case tourConstants.UPDATE_SELECTED_TOUR:
      return {...state, selectedTour: action.newTourFormState};
    case tourConstants.UPDATE_SELECTED_TOUR_DATE:
      return {...state, selectedTourDate: action.newTourDateFormState};
    default:
      return state;
  }
}

export default TourReducer;

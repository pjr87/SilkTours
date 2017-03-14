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
    id_tour: '',
    name: '',
    description: '',
    price: '',
    average_rating: '',
    max_group_size: '',
    min_group_size: '',
    firstStart_date: '',
    lastEnd_date: '',
    stops: [],
    guides: [],
    availableDates: [],
    additional_accomadation: '',
    additional_food: '',
    additional_transport: '',
    interests: [],
    profile_image: '',
    profile_image_height: '',
    profile_image_width: '',
    ratings: [],
    rating_count: ''
  },
  tourDates: '',
  selectedTourDateId: '',
  selectedTourDateStart: '',
  selectedTourDateEnd: '',
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
    case tourDetailConstants.UPDATE_SELECTED_TOUR_DATE_ID:
      return {...state, selectedTourDateId: action.newTourDateIdFormState};
    case tourDetailConstants.UPDATE_SELECTED_TOUR_DATE_START:
        return {...state, selectedTourDateStart: action.newTourDateStartFormState};
    case tourDetailConstants.UPDATE_SELECTED_TOUR_DATE_END:
        return {...state, selectedTourDateEnd: action.newTourDateEndFormState};
    case tourDetailConstants.UPDATE_TOUR_DATES:
      return {...state, tourDates: action.newTourDatesState};
    default:
      return state;
  }
}

export default TourDetailReducer;

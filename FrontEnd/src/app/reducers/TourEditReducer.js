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

import * as TourEditConstants from '../constants/TourEditConstants';

// The initial application state
const initialState = {
  selectedTourId: '',
  selectedTour: {},
  isLoaded: false
};

/*
  export const UPDATE_TOUR_ID_FOR_EDIT = 'UPDATE_TOUR_ID_FOR_EDIT';
  export const UPDATE_SELECTED_TOUR_FOR_EDIT = 'UPDATE_SELECTED_TOUR_FOR_EDIT';
  export const SET_LOADED = 'SET_LOADED';
*/

// Takes care of changing the application state
function TourEditReducer(state = initialState, action) {
  switch (action.type) {
    case TourEditConstants.UPDATE_TOUR_ID_FOR_EDIT:
      return {...state, selectedTourId: action.newTourIdFormState};
    case TourEditConstants.SET_LOADED:
      return {...state, isLoaded: action.newLoadedState};
    case TourEditConstants.UPDATE_SELECTED_TOUR_FOR_EDIT:
      return {...state, selectedTour: action.newTourFormState};
    default:
      return state;
  }
}

export default TourEditReducer;

/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the authReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import * as tourCreationConstants from '../constants/TourCreationConstants';

// The initial application state
const initialState = {
  tour : {
    additional_accomadation: "",
    additional_food: "",
    additional_transport: "",
    address:{
      city:"",
      country:"",
      state_code:"",
      street:"",
      unit:"",
      zip:""},
    average_rating: 0,
    description: "",
    firstStart_date: "",
    guides: [],
    id_rating: null,
    is_deleted: false,
    lastEnd_date: "",
    max_group_size: 10,
    min_group_size: 1,
    name: "",
    price: 0,
    profile_image: "",
    profile_image_height: 0,
    profile_image_width: 0,
    date: 0,
    time: 0,
    rating_count: 0,
    interests:[],
    stops: []
  },
  currentlySending: false,
  errorMessage: ''
};

// Takes care of changing the application state
function TourCreationReducer(state = initialState, action) {
  switch (action.type) {
    case tourCreationConstants.UPDATE_TOUR:
      return {...state, tour: action.tour};
    case tourCreationConstants.UPDATE_TOUR_ADDRESS:
      return {
          ...state,
          tour : {
            ...state.tour,
            address : action.newAddressState
          }
        };
    case tourCreationConstants.SENDING_REQUEST:
      return {...state, currentlySending: action.sending};
    case tourCreationConstants.SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.message};
    case tourCreationConstants.CLEAR_ERROR:
      return {...state, errorMessage: ''}
    default:
      return state;
  }
}

export default TourCreationReducer;

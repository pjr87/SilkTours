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
      zip:""
    },
    average_rating: 0,
    description: "",
    firstStart_date: "",
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
    language: '',
    rating_count: 0,
    interests:[],
    stops: [],
    guides: []
  },
  startTime: 0,
  endTime: 0,
  photos: [],
  currentlySending: false,
  errorMessage: '',
  tabKey: 'info'
};

// Takes care of changing the application state
function TourCreationReducer(state = initialState, action) {
  switch (action.type) {
    case tourCreationConstants.UPDATE_TOUR:
      return {...state, tour: action.tour};
    case tourCreationConstants.UPDATE_TOUR_LANGUAGE:
      return {...state, tour : action.newLanguageState};
    case tourCreationConstants.UPDATE_TOUR_NAME:
      return {...state, tour : action.newNameState};
    case tourCreationConstants.SET_START_TIME:
      return {...state, startTime : action.newStartState};
    case tourCreationConstants.SET_END_TIME:
      return {...state, endTime : action.newEndState};
    case tourCreationConstants.UPDATE_TOUR_TIME:
      return {...state, tour : action.newTimeState};
    case tourCreationConstants.UPDATE_TOUR_DESCRIPTION:
      return {...state, tour : action.newDescriptionState};
    case tourCreationConstants.UPDATE_TOUR_INTEREST:
      return {...state, tour : action.newInterestState};
    case tourCreationConstants.UPDATE_TOUR_STOPS:
      return {...state, tour : action.newStopsState};
    case tourCreationConstants.UPDATE_TOUR_ADDITIONAL:
      return {...state, tour : action.newAdditionalState};
    case tourCreationConstants.UPDATE_TOUR_GUIDE:
      return {...state, tour : action.newGuideState};
    case tourCreationConstants.UPDATE_TOUR_PRICE:
      return {...state, tour : action.newPriceState};
    case tourCreationConstants.UPDATE_TOUR_PHOTO:
      return {...state, photos : action.newPhotoState};
    case tourCreationConstants.UPDATE_TAB_KEY:
      return {...state, tabKey: action.newTabKeyState};
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
    case tourCreationConstants.CLEAR_TOUR:
      return {...state, tour: initialState.tour}
    default:
      return state;
  }
}

export default TourCreationReducer;

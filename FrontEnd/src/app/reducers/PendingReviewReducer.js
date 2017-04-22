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

import * as pendingReviewConstants from '../constants/PendingReviewConstants';

// The initial application state
const initialState = {
  showPendingReview: false,
  tripCompleted: [],
  rating: '0',
  comment: '',
  isLoaded: false
};

// Takes care of changing the application state
function PendingReviewReducer(state = initialState, action) {
  switch (action.type) {
    case pendingReviewConstants.SHOW_PENDING_REVIEW:
      return {...state, showPendingReview: action.newShowPendingReviewFormState};
    case pendingReviewConstants.SHOW_TRIP_COMPLETED:
      return {...state, tripCompleted: action.newShowTripCompletedFormState};
    case pendingReviewConstants.SHOW_PENDING_REVIEW_RATING:
      return {...state, rating: action.newShowRatingFormState};
    case pendingReviewConstants.SHOW_PENDING_REVIEW_COMMENT:
      return {...state, comment: action.newShowCommentFormState};
    case pendingReviewConstants.SET_LOADED:
      return {...state, isLoaded: action.newLoadedState};
    default:
      return state;
  }
}

export default PendingReviewReducer;

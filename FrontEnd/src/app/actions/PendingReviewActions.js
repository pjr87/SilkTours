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

import * as pendingReviewConstants from '../constants/PendingReviewConstants';
import * as errorMessages from '../constants/MessageConstants';
import * as service from '../utils/databaseFunctions';
import { browserHistory } from 'react-router';

export function getPendingReviewsByUserId(userId, auth) {
  return (dispatch) => {
    try {
      service.getPendingReviewsByUserId(userId, auth).then(function(response){
        if(response.data) {
          console.log(response.data);
          if(response.data == "") {
            const ratingResponse = response.data
            console.log("Do now show");
            dispatch(setShowPendingReview(false));
            dispatch(setShowTripCompleted(response.data));
            dispatch(setShowRating(""));
            dispatch(setShowComment(""));
          }
          else {
            console.log("Test Review2");
            dispatch(setShowPendingReview(true));
            dispatch(setShowTripCompleted(response.data));
            dispatch(setShowRating(""));
            dispatch(setShowComment(""));
          }
        }
        else{
          // If there was a problem, show an error
          console.log('response.error: ' + response.error);
          dispatch(sendingRequest(false));
          dispatch(setErrorMessage(errorMessages.USER_UPDATE_FAILED));
        }
      });
    } catch(e) {
      console.log("error occured pulling tour review data");
    }
  };
}

export function postPendingReviewsByRatingComment(id_user, id_tour, rating, comment, auth) {
  return (dispatch) => {
    try {
      var pendingReviewObject = {
        id_user_rated: id_user,
        id_tour_rated: id_tour,
        rating: rating,
        comment: comment
      }
      console.log("PendingReview = ");
      console.log(pendingReviewObject);
      service.postPendingReviewsByRatingComment(pendingReviewObject, auth);
    } catch(e) {
      console.log("error occured pulling posting pending review");
    }
  };
}

export function putClearPendingReviewsByEventId(eventId, auth) {
  return (dispatch) => {
    // try {
      console.log("eventId = " + eventId);
      service.putClearPendingReviewsByEventId(eventId, auth);
    }
  //   catch(e) {
  //     console.log("error occured pulling clearing pending review");
  //   }
  // };
}

/**
 * Selects a show pending review
 * @param  {boolean} pendingReivew The selected show pending review
 */
 export function setShowPendingReview(newShowPendingReviewFormState) {
   return (dispatch) => {
     dispatch(updateShowPendingReview(newShowPendingReviewFormState));
   };
 }

/**
 * Selects a show trip completed
 * @param  {boolean} tripCompleted The selected show trip completed
 */
export function setShowTripCompleted(newShowTripCompletedFormState) {
  return (dispatch) => {
    dispatch(updateShowTripCompleted(newShowTripCompletedFormState));
  };
}

/**
 * Selects a show rating
 * @param  {String} rating The selected show rating
 */
export function setShowRating(newShowRatingFormState) {
  return (dispatch) => {
    dispatch(updateShowRating(newShowRatingFormState));
  };
}

/**
 * Selects a show comment
 * @param  {String} comment The selected show comment
 */
export function setShowComment(newShowCommentFormState) {
  return (dispatch) => {
    dispatch(updateShowComment(newShowCommentFormState));
  };
}

/**
 * Updates a selected pending review
 * @param  {String} pendingReivew
 */
export function updateShowPendingReview(newShowPendingReviewFormState) {
  return { type: pendingReviewConstants.SHOW_PENDING_REVIEW, newShowPendingReviewFormState };
}

/**
 * Updates a selected trip completed
 * @param  {String} tripCompleted
 */
export function updateShowTripCompleted(newShowTripCompletedFormState) {
  return { type: pendingReviewConstants.SHOW_TRIP_COMPLETED, newShowTripCompletedFormState };
}

/**
 * Updates a selected rating
 * @param  {String} rating
 */
export function updateShowRating(newShowRatingFormState) {
  return { type: pendingReviewConstants.SHOW_PENDING_REVIEW_RATING, newShowRatingFormState };
}

/**
 * Updates a selected comment
 * @param  {String} comment
 */
export function updateShowComment(newShowCommentFormState) {
  return { type: pendingReviewConstants.SHOW_PENDING_REVIEW_COMMENT, newShowCommentFormState };
}
/**
 * Sets the loaded state for the tours
 * @param  {Integer} newLoadedState
 */
export function setLoadedState(newLoadedState) {
  return { type: pendingReviewConstants.SET_LOADED, newLoadedState };
}

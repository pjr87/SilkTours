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

import {
  CHANGE_FORM,
  SET_AUTH,
  UPDATE_USER,
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR
} from '../constants/AuthConstants';
import cognitoFunctions from '../utils/cognitoFunctions';

// The initial application state
const initialState = {
  formState: {
    username: '',
    password: ''
  },
  user: {
    fullName: 'Test', //User's name
    email: 'test@email.com', //User's email
    id_user: '1', //Primary key of user in users table
    provider: 'testProvider' //What service signed in with (Facebook, Developer)
  },
  auth: {
    Logins: 'testLogins', //AWS value needed to request secured endpoints
    identityID: 'testID' //Unique identityID assigned to user by AWS
  },
  currentlySending: false,
  loggedIn: cognitoFunctions.loggedIn(),
  errorMessage: ''
};

// Takes care of changing the application state
function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
       return {...state, formState: action.newFormState};
    case SET_AUTH:
      return {...state, loggedIn: action.newAuthState};
    case UPDATE_USER:
      return {...state, user: action.newUserState};
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending};
    case SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.message};
    case CLEAR_ERROR:
      return {...state, errorMessage: ''}
    default:
      return state;
  }
}

export default AuthReducer;

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

import * as authConstants from '../constants/AuthConstants';
import cognitoFunctions from '../utils/cognitoFunctions';

// The initial application state
const initialState = {
  loginFormState: {
    username: '',
    password: ''
  },
  signUpFormState: {
    username: '',
    password: '',
    phoneNumber: ''
  },
  user: {
    address: {
      city: "",
      country: "",
      state_code: "",
      street: "",
      unit: "",
      zip: ""
    },
    description: "",
    dob: "",
    email: "",
    first_name: "",
    interests: [],
    last_name: "",
    phone_number: "",
    profile_picture: "",
    tours_taking: [],
    tours_teaching: [],
  },
  auth: {
    Logins: 'testLogins', //AWS value needed to request secured endpoints
    identityID: 'testID' //Unique identityID assigned to user by AWS
  },
  id_user: '1', //Primary key of user in users table
  provider: 'testProvider', //What service signed in with
  currentlySending: false,
  loggedIn: cognitoFunctions.loggedIn(),
  errorMessage: ''
};

// Takes care of changing the application state
function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.CHANGE_LOGIN_FORM:
      return {...state, loginFormState: action.newLoginFormState};
    case authConstants.CHANGE_SIGNUP_FORM:
      return {...state, signUpFormState: action.newSignUpFormState};
    case authConstants.SET_AUTH:
      return {...state, loggedIn: action.newAuthState};
    case authConstants.UPDATE_USER:
      return {...state, user: action.newUserState};
    case authConstants.UPDATE_ID:
      return {...state, id_user: action.newIDState};
    case authConstants.UPDATE_PROVIDER:
      return {...state, provider: action.newProviderState};
    case authConstants.UPDATE_AUTH:
      return {...state, auth: action.newAuthState};
    case authConstants.SENDING_REQUEST:
      return {...state, currentlySending: action.sending};
    case authConstants.SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.message};
    case authConstants.CLEAR_ERROR:
      return {...state, errorMessage: ''}
    default:
      return state;
  }
}

export default AuthReducer;

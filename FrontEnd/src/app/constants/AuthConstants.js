/*
 * AuthConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */
export const CHANGE_LOGIN_FORM = 'CHANGE_LOGIN_FORM';
export const CHANGE_SIGNUP_FORM = 'CHANGE_SIGNUP_FORM';
export const SET_AUTH = 'SET_AUTH';
export const SET_COGNITO_USER = 'SET_COGNITO_USER';
export const UPDATE_AUTH = 'UPDATE_AUTH';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_ID = 'UPDATE_ID';
export const SET_CONFIRMED = 'SET_CONFIRMED';
export const UPDATE_PROVIDER = 'UPDATE_PROVIDER';
export const SENDING_REQUEST = 'SENDING_REQUEST';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

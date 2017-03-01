/*
 Sign.js

 User sign in page, integration with FB, AWS
 Written by: Phillip Ryan

 Calls functions from CognitoSync folder to display login functions
 Displayed when Signin is click

 TODO:
  Link back to the home page after sign up
  Add Signin from exisiting user account sequence for (devAuth, Facebook, other)
*/

import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import auth from '../../utils/cognitoFunctions';
import { login, changeForm } from '../../actions/AuthActions';
import ErrorMessage from '../common/ErrorMessage';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');


class SignInContents extends React.Component{
  constructor(){
    super();

    this.loginSubmit = this.loginSubmit.bind(this)
    this._changeUsername = this._changeUsername.bind(this)
    this._changePassword = this._changePassword.bind(this)
  }

  _changeUsername (event) {
    this._emitChange({...this.props.loginFormState, username: event.target.value})
  }

  _changePassword (event) {
    this._emitChange({...this.props.loginFormState, password: event.target.value})
  }

  _emitChange (newLoginFormState) {
    this.props.dispatch(changeForm(newLoginFormState))
  }

  loginSubmit(event) {
    event.preventDefault()
    this.props.dispatch(login(this.props.loginFormState.username, this.props.loginFormState.password));
  }

  render() {
    const {errorMessage} = this.props;
    return (
      <div>
        <br/>
        <br/>
        <Form inline>
            <FormGroup controlId="formHorizontalEmail">
                <ControlLabel>Email </ControlLabel>
                <FormControl
                  type="username"
                  ref="username"
                  onChange={this._changeUsername}
                  placeholder="Email" />
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password </ControlLabel>
                <FormControl
                  type="password"
                  ref="password"
                  onChange={this._changePassword}
                  placeholder="Password" />
            </FormGroup>
            <Button onClick={this.loginSubmit}>Login</Button>
            {errorMessage &&
            <p style={{color:'red'}}>{errorMessage}</p>
            }
        </Form>
        <br/>
        <br/>
        <br/>
        <p>Don't have one?</p>
        <Link to='/signup'>CREATE ONE</Link>
        <br/>
        <br/>
      </div>
    )
  }
}


// select chooses which props to pull from store
function select(state) {
  return {
    loginFormState: state.AuthReducer.loginFormState,
    currentlySending: state.AuthReducer.currentlySending
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(SignInContents);

/*
 SignUp.js

 User sign up page, integration with FB, AWS
 Written by: Phillip Ryan

 Calls functions from CognitoSync folder to display login functions
 Displayed when Signup is click



 TODO:
  Link back to the home page afer sign up
  Todo phone number verification
  Add SignUp from new user account sequence for (Facebook, other)
*/

import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import auth from '../../utils/cognitoFunctions';
import { signup, changeForm } from '../../actions/AuthActions';
import ErrorMessage from '../common/ErrorMessage';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class SignUpContents extends React.Component{
  //Define auth profile state
  constructor(){
    super();

    this.signUpSubmit = this.signUpSubmit.bind(this)
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

  signUpSubmit(event) {
    event.preventDefault()
    this.props.dispatch(login(this.props.loginFormState.username, this.props.loginFormState.password));
  }

  render() {
    const {errorMessage} = this.props;
    return(
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
            <Button onClick={this.signUpSubmit}>Login</Button>
            {errorMessage &&
            <p style={{color:'red'}}>{errorMessage}</p>
            }
        </Form>
        <br/>
        <br/>
      </div>
    );
  }
}

export default SignUpContents;

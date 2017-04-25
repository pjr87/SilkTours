/*
 SignInContents.js

 User sign in page, integration with FB, AWS
 Written by: Phillip Ryan
*/

import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Button, ControlLabel, Form, FormControl, HelpBlock, FormGroup } from 'react-bootstrap';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import auth from '../../utils/cognitoFunctions';
import { login, changeLoginForm, clearError } from '../../actions/AuthActions';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');


class SignInContents extends React.Component{
  constructor(){
    super();

    this.loginSubmit = this.loginSubmit.bind(this)
    this._changeUsername = this._changeUsername.bind(this)
    this._changePassword = this._changePassword.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  _changeUsername (event) {
    this._emitChange({...this.props.loginFormState, username: event.target.value})
  }

  _changePassword (event) {
    this._emitChange({...this.props.loginFormState, password: event.target.value})
  }

  _emitChange (newLoginFormState) {
    this.props.dispatch(changeLoginForm(newLoginFormState))
  }

  loginSubmit(event) {
    event.preventDefault()
    this.props.dispatch(login(this.props.loginFormState.username, this.props.loginFormState.password));
  }

  render() {
    let isLoading = this.props.currentlySending;
    function ErrorFunc(props){

      if( props.errorText ){
        return (<HelpBlock>{props.errorText}</HelpBlock>);
      }

      return <div></div>
    }

    return (
      <div>
        <Grid>
          <br/>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl
                  type="username"
                  ref="username"
                  onChange={this._changeUsername}
                  placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Password
              </Col>
              <Col sm={4}>
                <FormControl
                  type="password"
                  ref="password"
                  onChange={this._changePassword}
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup
              validationState = {this.props.errorMessage ? "error" : "success"}>
              <Col smOffset={4} sm={4}>
                <ErrorFunc errorText = {this.props.errorMessage} />
                <Button
                  disabled={isLoading}
                  onClick={!isLoading ? this.loginSubmit : null}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Col>
            </FormGroup>
            <br/>
            <Col sm={4} smOffset={4}>
              <p>Don't have a travel profile?</p>
              <Link to='/signup' onClick={this._clearError}>Sign up!</Link>
            </Col>
          </Form>
        </Grid>
      </div>
    )
  }
  _clearError () {
    this.props.dispatch(clearError())
  }
}

SignInContents.propTypes = {
  currentlySending: React.PropTypes.bool,
  loginFormState: React.PropTypes.object,
  errorMessage: React.PropTypes.string
}

// select chooses which props to pull from store
function select(state) {
  return {
    loginFormState: state.AuthReducer.loginFormState,
    currentlySending: state.AuthReducer.currentlySending,
    errorMessage: state.AuthReducer.errorMessage
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(SignInContents);

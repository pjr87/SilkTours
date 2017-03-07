/*
 SignUpContents.js

 User sign up page, integration with FB, AWS
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
import { signUp, changeSignUpForm } from '../../actions/AuthActions';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class SignUpContents extends React.Component{
  constructor(){
    super();

    this.signUpSubmit = this.signUpSubmit.bind(this)
    this._changeFirstName = this._changeFirstName.bind(this)
    this._changeLastName = this._changeLastName.bind(this)
    this._changeUsername = this._changeUsername.bind(this)
    this._changePassword = this._changePassword.bind(this)
    this._changePhoneNumber = this._changePhoneNumber.bind(this)
  }

  _changeFirstName (event) {
    this._emitChange({...this.props.signUpFormState, firstname: event.target.value})
  }

  _changeLastName (event) {
    this._emitChange({...this.props.signUpFormState, lastname: event.target.value})
  }

  _changeUsername (event) {
    this._emitChange({...this.props.signUpFormState, username: event.target.value})
  }

  _changePassword (event) {
    this._emitChange({...this.props.signUpFormState, password: event.target.value})
  }

  _changePhoneNumber (event) {
    this._emitChange({...this.props.signUpFormState, phoneNumber: event.target.value})
  }

  _emitChange (newSignUpFormState) {
    this.props.dispatch(changeSignUpForm(newSignUpFormState))
  }

  signUpSubmit(event) {
    event.preventDefault()

    this.props.dispatch(
      signUp(
        this.props.signUpFormState.firstname,
        this.props.signUpFormState.lastname,
        this.props.signUpFormState.username,
        this.props.signUpFormState.password,
        this.props.signUpFormState.phoneNumber)
    );
  }

  render() {
    let isLoading = this.props.currentlySending;
    function ErrorFunc(props){

      if( props.errorText ){
        return (<HelpBlock>{props.errorText}</HelpBlock>);
      }

      return <div></div>
    }

    return(
      <div>
        <Grid>
          <br/>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                First Name
              </Col>
              <Col sm={4}>
                <FormControl
                  type="firstName"
                  ref="firstName"
                  onChange={this._changeFirstName}
                  placeholder="First Name" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Last Name
              </Col>
              <Col sm={4}>
                <FormControl
                  type="lastName"
                  ref="lastName"
                  onChange={this._changeLastName}
                  placeholder="Last Name" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
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
              <Col componentClass={ControlLabel} sm={2}>
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
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Phone Number
              </Col>
              <Col sm={4}>
                <FormControl
                  type="phoneNumber"
                  ref="phoneNumber"
                  onChange={this._changePhoneNumber}
                  placeholder="Phone Number" />
              </Col>
            </FormGroup>
            <FormGroup
              validationState = {this.props.errorMessage ? "error" : "success"}>
              <Col smOffset={2} sm={10}>
                <ErrorFunc errorText = {this.props.errorMessage} />
                <Button
                  disabled={isLoading}
                  onClick={!isLoading ? this.signUpSubmit : null}>
                  {isLoading ? 'Signing up...' : 'Sign up!'}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Grid>
      </div>
    );
  }
}

SignUpContents.propTypes = {
  currentlySending: React.PropTypes.bool,
  signUpFormState: React.PropTypes.object,
  errorMessage: React.PropTypes.string
}

// select chooses which props to pull from store
function select(state) {
  return {
    signUpFormState: state.AuthReducer.signUpFormState,
    currentlySending: state.AuthReducer.currentlySending,
    errorMessage: state.AuthReducer.errorMessage
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(SignUpContents);

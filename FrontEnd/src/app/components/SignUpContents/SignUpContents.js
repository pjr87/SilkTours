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
import config from '../../utils/config';
import { signUp, facebookSignUp, changeSignUpForm } from '../../actions/AuthActions';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class SignUpContents extends React.Component{
  constructor(){
    super();

    this.signUpSubmit = this.signUpSubmit.bind(this)
    this.signUpFBSubmit = this.signUpFBSubmit.bind(this)
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

  signUpFBSubmit(event) {
    event.preventDefault()
    FB.login(function(response) {
      if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        var expiresIn = response.authResponse.expiresIn;
        FB.api('/me', {
          locale: 'en_US',
          fields: 'id,cover,first_name,last_name,age_range,link,gender,locale,picture,timezone,verified,email'},
        function(response) {
          this.props.dispatch(facebookSignUp(response, accessToken, expiresIn));
        }.bind(this));
      } else {
        // The person is not logged into this app or we are unable to tell.
      }
    }.bind(this), {scope: 'public_profile,email'});
  }

  componentDidMount(){
    window.fbAsyncInit = function() {
      FB.init({
        appId      : config.facebookAppId,
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : config.facebookVersion
      });
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=606443696175641";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
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
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
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
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
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
              <Row>
                <Col sm={8} smOffset={4}>
                  <ErrorFunc errorText = {this.props.errorMessage} />
                </Col>
              </Row>
              <Row>
                <Col sm={8} smOffset={4}>
                  <Button
                    disabled={isLoading}
                    onClick={!isLoading ? this.signUpSubmit : null}>
                    {isLoading ? 'Signing up...' : 'Sign up!'}
                  </Button>
                  <Button
                    disabled={isLoading}
                    onClick={!isLoading ? this.signUpFBSubmit : null}>
                    {isLoading ? 'Signing up...' : 'Sign up with Facebook!'}
                  </Button>
                </Col>
              </Row>
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

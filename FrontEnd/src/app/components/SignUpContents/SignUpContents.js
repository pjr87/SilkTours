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

import auth from '../../utils/cognitoFunctions';
import { signUp, facebookSignUp, changeSignUpForm } from '../../actions/AuthActions';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class SignUpContents extends React.Component{
  constructor(){
    super();

    this.signUpSubmit = this.signUpSubmit.bind(this)
    this.signUpFacebook = this.signUpFacebook.bind(this)
    this.checkLoginState = this.checkLoginState.bind(this)
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

  signUpFacebook() {
    FB.login(function(response) {
      if (response.status === 'connected') {
        console.log(response);
        // Logged into your app and Facebook.
      } else {
        console.log(response);
        // The person is not logged into this app or we are unable to tell.
      }
    });
    //this.props.dispatch(facebookSignUp());
  }

  componentWillMount() {
    window['statusChangeCallback'] = this.statusChangeCallback;
    window['checkLoginState'] = this.checkLoginState;
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

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }.bind(this);

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=606443696175641";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

    var s = '<div class="fb-login-button"' +
        'data-max-rows="4" data-size="medium"' +
        'data-button-type="login_with" data-show-faces="true"' +
        'data-auto-logout-link="true" data-use-continue-as="true"' +
        'onlogin={this.checkLoginState}></div>';

    var div = document.getElementById('social-login-button-facebook')
    div.innerHTML = s;
  }

  componentWillUnmount() {
    delete window['statusChangeCallback'];
    delete window['checkLoginState'];
  }

  statusChangeCallback(response) {
      console.log(response);
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        //testAPI();
      } else {
        // The person is not logged into your app or we are unable to tell.
      }
  }

  // Callback for Facebook login button
  checkLoginState() {
      console.log('checking login state...');
      FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
         console.log(response);
         console.log('statusChangeCallback');
         console.log(response);
      });
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
              <Col sm={8} smOffset={4}>
                <ErrorFunc errorText = {this.props.errorMessage} />
                <Button
                  disabled={isLoading}
                  onClick={!isLoading ? this.signUpSubmit : null}>
                  {isLoading ? 'Signing up...' : 'Sign up!'}
                </Button>
                <div id='social-login-button-facebook'>
                </div>
                <Button
                  disabled={isLoading}
                  onClick={!isLoading ? this.signUpFacebook : null}>
                  {isLoading ? 'Signing up...' : 'Sign up with Facebook!'}
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

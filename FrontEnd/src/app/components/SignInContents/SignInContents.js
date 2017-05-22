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
import config from '../../utils/config';
import { login, facebookLogin, changeLoginForm, clearError } from '../../actions/AuthActions';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');


class SignInContents extends React.Component{
  constructor(){
    super();

    this.loginSubmit = this.loginSubmit.bind(this)
    this.loginFBSubmit = this.loginFBSubmit.bind(this)
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

  loginFBSubmit(event) {
    event.preventDefault()
    FB.login(function(response) {
      if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        var expiresIn = response.authResponse.expiresIn;
        FB.api('/me', {
          locale: 'en_US',
          fields: 'id,cover,first_name,last_name,age_range,link,gender,locale,picture,timezone,verified,email'},
        function(response) {
          this.props.dispatch(facebookLogin(response, accessToken, expiresIn));
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
                  placeholder="Email"
                  value={this.props.loginFormState.username} />
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
                  placeholder="Password"
                  value={this.props.loginFormState.password}/>
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
                <Button
                  disabled={isLoading}
                  onClick={!isLoading ? this.loginFBSubmit : null}>
                  {isLoading ? 'Logging in...' : 'Login with facebook'}
                </Button>
              </Col>
            </FormGroup>
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

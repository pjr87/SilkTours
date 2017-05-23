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

import style from "./style.css";

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class SignUpContents extends React.Component{
  constructor(){
    super();

    this.state = {
      errors:[],
      passFocus: false,
    };

    this.signUpSubmit = this.signUpSubmit.bind(this)
    this.signUpFBSubmit = this.signUpFBSubmit.bind(this)
    this._changeFirstName = this._changeFirstName.bind(this)
    this._changeLastName = this._changeLastName.bind(this)
    this._changeUsername = this._changeUsername.bind(this)
    this._changePassword = this._changePassword.bind(this)
    this._changePhoneNumber = this._changePhoneNumber.bind(this)
    this.isEmpty = this.isEmpty.bind(this);
    this.setValidation = this.setValidation.bind(this)
  }

  setValidation(field){

    console.log("validating ", field);

    var currentState = "";

    console.log(this.props.signUpFormState);

    if( field == "firstName" ){
      currentState = this.props.signUpFormState['firstname'];

      if( !currentState.trim() ){
        var errors = this.state.errors;
        errors[field] = "Field is required"
        this.setState({errors: errors});
      }
      else{
        var errors = this.state.errors;
        delete errors[field];
        this.setState({errors: errors});
      }

    }
    else if( field == "lastName" ){
      currentState = this.props.signUpFormState['lastname'];

      if( !currentState.trim() ){
        var errors = this.state.errors;
        errors[field] = "Field is required"
        this.setState({errors: errors});
      }
      else{
        var errors = this.state.errors;
        delete errors[field];
        this.setState({errors: errors});
      }

    }
    else if( field == "username" ){
      currentState = this.props.signUpFormState['username'];
      var regex  = /^[a-z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-zA-Z]+)?$/;
      
      if( !currentState.trim() ){
        var errors = this.state.errors;
        errors[field] = "Field is required"
        this.setState({errors: errors});
      }
      else if(!regex.test( currentState.trim().toLowerCase() )){
        var errors = this.state.errors;
        errors[field] = "Invalid Email Format"
        this.setState({errors: errors});
      }
      else{
        var errors = this.state.errors;
        delete errors[field];
        this.setState({errors: errors});
      }
    }
    else if( field == "password" ){
      this.setState({passFocus: false})
      currentState = this.props.signUpFormState['password'];

      var regexPass = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,64}$/;

      //var regexSpecial = /^(?=.*[!@#$%^&*])/;
      var regexCaps   = /^(?=.*[A-Z])/;
      var regexLower  = /^(?=.*[a-z])/;
      var regexNum    = /^(?=.*[0-9])/;

      console.log("regexCaps: ", regexCaps.test( currentState.trim()) )
      console.log("regexNum: ", regexNum.test( currentState.trim()) )
      console.log("regexPass: ", regexPass.test( currentState.trim()) )



      if( !currentState.trim() ){
        var errors = this.state.errors;
        errors[field] = "Field is required"
        this.setState({errors: errors});
      }
      else if( currentState.length < 8 || currentState.length > 64 ){
        var errors = this.state.errors;
        errors[field] = "Password must be between 8 and 64 characters"
        this.setState({errors: errors});
      }
      else if( !regexCaps.test( currentState.trim() )){
        var errors = this.state.errors;
        errors[field] = "Password must contain at least one uppercase letter"
        this.setState({errors: errors});
      }
      else if( !regexLower.test( currentState.trim() )){
        var errors = this.state.errors;
        errors[field] = "Password must contain at least one lowercase letter"
        this.setState({errors: errors});
      }
      else if( !regexNum.test( currentState.trim() )){
        var errors = this.state.errors;
        errors[field] = "Password must contain at least one number"
        this.setState({errors: errors});
      }
      else if( !regexPass.test( currentState.trim() ) ){
        var errors = this.state.errors;
        errors[field] = "Password does not meet minimum password requirements"
        this.setState({errors: errors});
      }
      else{
        var errors = this.state.errors;
        delete errors[field];
        this.setState({errors: errors});
      }
    }
    else if( field == "phoneNumber" ){
      currentState = this.props.signUpFormState['phoneNumber'];

      var regexPhone = /^[(]{0,1}[+]{0,1}[1]{0,1}[)]{0,1}[- ]{0,2}[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

      if( !currentState.trim() ){
        var errors = this.state.errors;
        errors[field] = "Field is required"
        this.setState({errors: errors});
      }
      else if( !regexPhone.test( currentState.trim() ) ){
        var errors = this.state.errors;
        errors[field] = "invalid"
        this.setState({errors: errors});
      }
      else{
        var errors = this.state.errors;
        delete errors[field];
        this.setState({errors: errors});
      }
    }


    console.log("state: " + currentState);
    console.log("errors: ", this.state.errors);

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

    var fields = ["firstName", "lastName", "username" ,"password" ,"phoneNumber"];

    var errors = [];

    fields.forEach(function(field) {
      errors[field] = ''
    }.bind(this));


    this.setState({errors: errors});


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

  isEmpty( obj ) { 
    for ( var prop in obj ) { 
      return false; 
    } 
    return true; 
  }


  render() {
    let isLoading = this.props.currentlySending;
    function ErrorFunc(props){

      if( props.errorText ){
        return (<HelpBlock>{props.errorText}</HelpBlock>);
      }

      return <div></div>
    }


    console.log("focus: ", this.state.passFocus);

    return(
      <div>
        <Grid>
          <br/>
          <Form horizontal>
            <FormGroup validationState={this.state.errors['firstName'] != '' && 'firstName' in this.state.errors && 'error' || !('firstName' in this.state.errors) && null }> 
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                First Name
              </Col>
              <Col sm={4}>
                <FormControl
                  type="firstName"
                  ref="firstName"
                  onChange={this._changeFirstName}
                  placeholder="First Name"
                  onBlur={()=>this.setValidation("firstName")}
                  value={this.props.signUpFormState.firstname} />
                <ErrorFunc errorText = {this.state.errors['firstName']} />
              </Col>
            </FormGroup>
            <FormGroup validationState={this.state.errors['lastName'] != '' && 'lastName' in this.state.errors && 'error' || !('lastName' in this.state.errors) && null } >
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Last Name
              </Col>
              <Col sm={4}>
                <FormControl
                  type="lastName"
                  ref="lastName"
                  onChange={this._changeLastName}
                  placeholder="Last Name"
                  onBlur={()=>this.setValidation("lastName")}
                  value={this.props.signUpFormState.lastname} />
                <ErrorFunc errorText = {this.state.errors['lastName']} />
              </Col>
            </FormGroup>
            <FormGroup validationState={this.state.errors['username'] != '' && 'username' in this.state.errors && 'error' || !('username' in this.state.errors) && null }>
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl
                  type="username"
                  ref="username"
                  onChange={this._changeUsername}
                  placeholder="Email"
                  onBlur={()=>this.setValidation("username")} 
                  value={this.props.signUpFormState.username}/>
                <ErrorFunc errorText = {this.state.errors['username']} />
              </Col>
            </FormGroup>
            <FormGroup validationState={this.state.errors['password'] != '' && 'password' in this.state.errors && 'error' || !('password' in this.state.errors) && null }>
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Password
              </Col>
              <Col sm={4}>
                <FormControl
                  type="password"
                  ref="password"
                  onChange={this._changePassword}
                  placeholder="Password" 
                  onFocus={()=> this.setState({passFocus: true})}
                  onBlur={()=>this.setValidation("password")}
                  value={this.props.signUpFormState.password} />
                <ErrorFunc errorText = {this.state.errors['password']} />
                {this.state.passFocus && 
                  <div className={style.passRules}>
                    <ul>
                    <li>Use 8 to 64 characters.</li>
                    <li>Must contain at least one number, one lowercase letter, and one uppercase letter.</li>
                    <li>Password is case sensitive.</li>
                    <li>Avoid using the same password for multiple sites.</li></ul>
                  </div>}
              </Col>
            </FormGroup>
            <FormGroup validationState={this.state.errors['phoneNumber'] != '' && 'phoneNumber' in this.state.errors && 'error' || !('phoneNumber' in this.state.errors) && null }>
              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Phone Number
              </Col>
              <Col sm={4}>
                <FormControl
                  type="phoneNumber"
                  ref="phoneNumber"
                  onChange={this._changePhoneNumber}
                  placeholder="Phone Number"
                  onBlur={()=>this.setValidation("phoneNumber")}
                  value={this.props.signUpFormState.phoneNumber} />
                <ErrorFunc errorText = {this.state.errors['phoneNumber']} />
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
                    disabled={isLoading || !this.isEmpty(this.state.errors)}
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

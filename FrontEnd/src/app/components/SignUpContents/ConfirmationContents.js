/*
 ConfirmationContents.js

 Confirmation page after sign up
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
import { confirmSignUp, changeSignUpForm } from '../../actions/AuthActions';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class ConfirmationContents extends React.Component{
  constructor(){
    super();

    this.confirmationCodeSubmit = this.confirmationCodeSubmit.bind(this)
    this._changeConfirmationCode = this._changeConfirmationCode.bind(this)
  }

  _changeConfirmationCode (event) {
    this._emitChange({...this.props.signUpFormState, confirmationCode: event.target.value})
  }

  _emitChange (newSignUpFormState) {
    console.log("newSignUpFormState", newSignUpFormState);
    this.props.dispatch(changeSignUpForm(newSignUpFormState))
  }

  confirmationCodeSubmit(event) {
    event.preventDefault();

    this.props.dispatch(confirmSignUp(
      this.props.cognitoUser,
      this.props.signUpFormState.firstname,
      this.props.signUpFormState.lastname,
      this.props.signUpFormState.username,
      this.props.signUpFormState.password,
      this.props.signUpFormState.phoneNumber,
      this.props.signUpFormState.confirmationCode,));
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
                Confirmation Code
              </Col>
              <Col sm={4}>
                <FormControl
                  type="confirmationCode"
                  ref="confirmationCode"
                  onChange={this._changeConfirmationCode}
                  placeholder="Confirmation Code" />
              </Col>
            </FormGroup>
            <FormGroup
              validationState = {this.props.errorMessage ? "error" : "success"}>
              <Col smOffset={2} sm={10}>
                <ErrorFunc errorText = {this.props.errorMessage} />
                <Button
                  disabled={isLoading}
                  onClick={!isLoading ? this.confirmationCodeSubmit : null}>
                  {isLoading ? 'Confirming..' : 'Confirm!'}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Grid>
      </div>
    );
  }
}

ConfirmationContents.propTypes = {
  currentlySending: React.PropTypes.bool,
  signUpFormState: React.PropTypes.object,
  cognitoUser: React.PropTypes.object,
  errorMessage: React.PropTypes.string,
  readyToConfirm: React.PropTypes.bool
}

// select chooses which props to pull from store
function select(state) {
  return {
    signUpFormState: state.AuthReducer.signUpFormState,
    currentlySending: state.AuthReducer.currentlySending,
    errorMessage: state.AuthReducer.errorMessage,
    cognitoUser: state.AuthReducer.cognitoUser,
    readyToConfirm: state.AuthReducer.readyToConfirm
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ConfirmationContents);

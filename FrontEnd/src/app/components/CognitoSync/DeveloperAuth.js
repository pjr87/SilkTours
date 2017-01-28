/*
 DeveloperAuth.js

 Developer authentication class
 Written by: Phillip Ryan

 Purpose is to provide form for users to sign up or login in with
 AWS cognito sync using email and password

 TODO: server side authentication of these accounts
 test with integration in AWS
 update UI css
*/

//import cognito libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import Modal from 'react-modal';
import appConfig from "./config";

// modal style constructor
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

//Define global AWS identity credentials
Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.identityPoolId,
  region: appConfig.region
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.userPoolId,
  ClientId: appConfig.clientId,
});

//React.Component is abstract base class
//DeveloperAuth is a subclass of React.Component
export class DeveloperAuth extends React.Component{

  //Mounting function, called when component is created and inserted into DOM
  //Called before component is mounted
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      phoneNumber: '',
      open: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handlePhoneNumberChange(e) {
    this.setState({phoneNumber: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const phoneNumber = this.state.phoneNumber.trim();
    const attributeList = [];

    var attributeEmail = new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      });
    var attributePhoneNumber = new CognitoUserAttribute({
        Name: 'phone_number',
        Value: this.state.phoneNumber,
      });

      console.log(this.state.phoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    var cognitoUser;

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      console.log('call result: ' + result);
    });

    if(cognitoUser == result.user){
      this.openModal();
    }

    cognitoUser.confirmRegistration('503934', true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  //Mounting function, called when component is created and inserted into DOM
  //Required method - returns native representation of DOM component
  //Should not modify component state
  render() {
    return (
      <div>
      <h1>Sign up!</h1>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Email
          <input type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleEmailChange.bind(this)}/>
        </label>
        <label>
          Password
          <input type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handlePasswordChange.bind(this)}/>
        </label>
        <label>
          Phone Number
          <input type="text"
            value={this.state.phoneNumber}
            placeholder="Phone Number"
            onChange={this.handlePhoneNumberChange.bind(this)}/>
          <input type="submit" value="Sign Up"/>
        </label>
      </form>

      <Modal isOpen={this.state.open} style={customStyles}>
        <h4>Please enter confirmation code sent to this.state.email</h4>
        <input type="text"
          value={this.state.phoneNumber}
          placeholder="Confirmation Code"
          onChange={this.handlePhoneNumberChange.bind(this)}/>
        <input type="submit" value="Enter"/>
        <button onClick={this.closeModal}>Close</button>
      </Modal>
      </div>
    );
  }
}

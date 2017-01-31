/*
 DeveloperAuthSignUp.js

 Developer authentication class
 Written by: Phillip Ryan

 Purpose is to provide form for users to sign up with
 AWS cognito sync using email and password

 TODO:
 Update AuthStore after successful sign up, send to signIn
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

// Modal style constructor
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

// Step 1 - Define global AWS identity credentials
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
export class DeveloperAuthSignUp extends React.Component{

  //Mounting function, called when component is created and inserted into DOM
  //Called before component is mounted
  constructor(props) {
    super(props);

    //The state holds the relevant information a user can enter
    //when signing up via Developer Authentication
    this.state = {
      email: '',
      password: '',
      phoneNumber: '',
      confirmationCode: '',
      open: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    //Global cognitoUser represents the authenticated person
    this.cognitoUser;
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

  handleconfirmationCodeChange(e) {
    this.setState({confirmationCode: e.target.value});
  }

  //Fucntion called when the signUp form is submited by user
  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const phoneNumber = this.state.phoneNumber.trim();

    //Step 2 - Signing up Users to the User Pool for Silk

    //attributeList represents the reqiured or optional
    //attributes a user can use to sign up for an account
    const attributeList = [];

    var attributeEmail = new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      });
    var attributePhoneNumber = new CognitoUserAttribute({
        Name: 'phone_number',
        Value: this.state.phoneNumber,
      });

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    var err;

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      this.cognitoUser = result.user;
      console.log('user name is ' + this.cognitoUser.getUsername());
      console.log('call result: ' + result);
    });

    if(err){
      console.log(err);
      return;
    }else{
      //Opens the modal which allows user to input conirmationCode
      this.openModal();
    }
  }

  openModal () { this.setState({open: true}); }

  closeModal () {
    //When the user enters the confirmation code it is subbited to AWS
    this.setState({open: false});

    this.cognitoUser.confirmRegistration(this.state.confirmationCode, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }

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

      <Modal isOpen={this.state.open} contentLabel="Modal" style={customStyles}>
        <h4>Please enter confirmation code sent to {this.state.email}</h4>
        <input type="text"
          value={this.state.confirmationCode}
          placeholder="Confirmation Code"
          onChange={this.handleconfirmationCodeChange.bind(this)}/>
        <button onClick={this.closeModal}>Enter</button>
      </Modal>
      </div>
    );
  }
}

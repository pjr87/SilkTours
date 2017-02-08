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
import AuthStore from "../../stores/AuthStore.js"
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import Modal from 'react-modal';
import appConfig from "./config";
import * as service from '../../ajaxServices/AjaxList';

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

  buildJSON(phoneNumber, email){
    var user1 = {
      is_guide: false,
      phone_number: phoneNumber,
      email: email
    };
    return user1;
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
    var phoneNumber = this.state.phoneNumber.trim();

    //Remove all non-digit characters except + for international numbers
    phoneNumber = phoneNumber.replace(/[^\d\+]/g,"");

    //Add proper format to phone number
    if(phoneNumber.length == 10){
      var tmp = '+1' + phoneNumber;
      phoneNumber = tmp;
      console.log("Phone number is " + phoneNumber);
    }
    else if (phoneNumber.length == 12){
      console.log("Phone number is " + phoneNumber);
    }
    else{
      alert("Phone number must contain 10 or 12 digits");
    }

    this.state.phoneNumber = phoneNumber;

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
        Value: phoneNumber,
      });

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    var err;

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        alert(err);
        return;
      }
      else{
        this.cognitoUser = result.user;
        console.log('user name is ' + this.cognitoUser.getUsername());
        console.log('call result: ' + result);

        //Opens the modal which allows user to input conirmationCode
        this.openModal();
      }
    });
  }

  openModal () { this.setState({open: true}); }

  closeModal () {
    //When the user enters the confirmation code it is subbited to AWS
    this.setState({open: false});
    var err;

    this.cognitoUser.confirmRegistration(this.state.confirmationCode, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      else{
        console.log('call result: ' + result);
      }
    });

    if (err) {
      alert(err);
      return;
    }
    else{
      const email = this.state.email;
      const phoneNumber = this.state.phoneNumber;

      var user1 = {
        is_guide: false,
        phone_number: phoneNumber,
        email: email
      };

      console.log('user1 phone: ' + user1.phone_number);
      console.log('user1 email: ' + user1.email);

      var response;

      service.registerNewUser(user1).then(function(response){
        console.log("RESPONSE ");
        console.log(response.data);
        console.log(response.status);
      });

      console.log(response.data.id_users);

      AuthStore.signUp(email, "Developer");

      //TODO direct to profile page to finish sign up
    }
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

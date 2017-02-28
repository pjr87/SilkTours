/*
 DeveloperAuthSignUp.js

 Developer authentication class
 Written by: Phillip Ryan

 Purpose is to provide form for users to sign up with
 AWS cognito sync using email and password

 TODO:
 Update after successful sign up, send to signIn
*/

//import cognito libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { config, Config, CognitoIdentityCredentials, CognitoIdentityServiceProvider  } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import Modal from 'react-modal';
import appConfig from "./config";
import * as service from '../../utils/databaseFunctions';
import style from './style.css';

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
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: '',
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

  //Function called when the signUp form is submited by user
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
      const email = this.state.email.trim();
      const password = this.state.password.trim();

      console.log('email + ' + email);
      console.log('password + ' + password);
      const phoneNumber = this.state.phoneNumber;

      //TODO get initial tokens
      // Step 1 - Define global AWS identity credentials
      //Config.region = appConfig.region;
      config.update({region:'us-east-1'});

      //Step 2 - A confirmed user signs in to obtain a session.
      //The session contains:
      // 1. ID token that contains user claims
      // 2. Access token that is used internally to perform authenticated calls
      // 3. Refresh token that is used internally to refresh the session after it expires each hour.

      //authData represents the reqiured userName and password
      const authData = {
        Username: email,
        Password: password,
      };

      var authDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authData);

      const poolData = {
        UserPoolId: appConfig.userPoolId,
        ClientId: appConfig.clientId,
      };

      var userPool = new CognitoIdentityServiceProvider.CognitoUserPool(poolData);

      var userData = {
          Username : email,
          Pool : userPool
      };

      var cognitoUser = new CognitoIdentityServiceProvider.CognitoUser(userData);

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());

            let loginsIdpData = {};
            let loginsCognitoKey = 'cognito-idp.us-east-1.amazonaws.com/' + appConfig.userPoolId
            loginsIdpData[loginsCognitoKey] = result.getIdToken().getJwtToken();

            config.credentials = new CognitoIdentityCredentials({
              IdentityPoolId: appConfig.identityPoolId,
              Logins: loginsIdpData
            });

            // set region if not set (as not set by the SDK by default)
            config.update({
              credentials: config.credentials,
              region: appConfig.region
            });

            // Can get lots of credential information ie(sessionToken,accessKeyId
            // secretAccessKey,expiryWindow,expired,cred)
            config.credentials.get(function(err){
              if (err) {
                  alert(err);
              }
              else{
                var id = config.credentials._identityId;
                var user1 = {
                  is_guide: false,
                  phone_number: phoneNumber,
                  email: email,
                  Logins: loginsIdpData,
                  IdentityId: id
                };

                var response;

                service.registerNewUser(user1).then(function(response){
                  console.log("RESPONSE ");
                  console.log(response.data);
                  console.log(response.status);

                  var fullName = name[0] + " " + name[1];

                  if(response.data.email == email){
                    //authStore.signUp(fullName, email, id, response.data.id_users, loginsIdpData, "Developer");

                    config.credentials.clearCachedId();

                    //direct to settings page to finish sign up
                    //window.location.assign('../Settings');
                  }
                });
              }
          });
        }
      });
    }
  }

  //Mounting function, called when component is created and inserted into DOM
  //Required method - returns native representation of DOM component
  //Should not modify component state
  render() {
    return (
      <div>
      <h4>Create a travel profile</h4>
      <br/>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          <p className = {style.signInContents}>Email</p>
          <input type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleEmailChange.bind(this)}/>
          <br/>
          <br/>
        </label>
        <label>
          <p className = {style.signInContents}>Password</p>
          <input type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handlePasswordChange.bind(this)}/>
          <br/>
          <br/>
        </label>
        <label>
          <p className = {style.signInContents}>Phone Number</p>
          <input type="text"
            value={this.state.phoneNumber}
            placeholder="Phone Number"
            onChange={this.handlePhoneNumberChange.bind(this)}/>
          <br/>
          <br/>
          <input type="submit" value="Sign Up"/>
          <br/>
          <br/>
        </label>
        <br/>
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

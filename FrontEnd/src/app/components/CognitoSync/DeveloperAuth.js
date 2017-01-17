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
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import appConfig from "./config";

//Define global AWS identity credentials
Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.identityPoolId
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
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('user name is ' + result.user.getUsername());
      console.log('call result: ' + result);
    });
  }

  //Mounting function, called when component is created and inserted into DOM
  //Required method - returns native representation of DOM component
  //Should not modify component state
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
      </div>
    );
  }
}

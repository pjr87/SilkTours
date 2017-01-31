/*
 FederatedAuthSignIn.js

Federated Identity Authentication Sign In
 Written by: Phillip Ryan

 Purpose is to provide link from federated ID to AWS

 TODO:
all
*/

//import cognito libraries
import aws from "aws-sdk";
import {
   CognitoUserPool,
   CognitoUserAttribute
 } from "amazon-cognito-identity-js";
 import config from "./config";

//React.Component is abstract base class
export class FederatedAuthSignIn{
  //Constructor to initiate proxy if needed
  constructor(){
    if(!aws.config.region)
      aws.config.region = 'us-east-1';

      this.cognitoIdentity = new AWS.CognitoIdentity();
      this.cognitoSync = new AWS.CognitoSync();
      this.ses = new AWS.SES();
    }

  //This function gets called upon a successful sign in
  //Provider used is passed to this call along with the appropriate
  //JSON for use when registering user with AWS
  startAWS(response, provider){
    this.response = response;
    console.log(this.response)

    //TODO switch based on provider


    //Tell the authStore that the user is signed in, //TODO with relavant information
    authStore.updateProfile(1, this.response.name, provider);
  }

  // ---------------
  // HELPERS
  // ---------------

}

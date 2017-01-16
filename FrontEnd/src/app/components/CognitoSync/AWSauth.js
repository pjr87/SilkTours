/*
 FacebookAuth.js

 Facebook authentication class
 Written by: Phillip Ryan

 Purpose is to provide link to Facebook and AWS

 TODO:
 test with integration in AWS
 update UI css
*/

//import cognito libraries
import aws from "aws-sdk";
import appConfig from "./config";

//React.Component is abstract base class
//DeveloperAuth is a subclass of React.Component
export class AWSauth{
  constructor(){
  }

  startAWS(response, provider){
    this.response = response;
    console.log(this.response)

    //Tell the authStore that the user is signed in, //TODO with relavant information
    authStore.updateProfile(1, this.response.name, provider);
  }

}

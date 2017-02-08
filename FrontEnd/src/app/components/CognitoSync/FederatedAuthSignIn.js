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
export default class FederatedAuthSignIn{
  //Constructor to initiate proxy if needed
  constructor(){
    if(!aws.config.region)
      aws.config.region = 'us-east-1';
  }

  //This function gets called upon a successful sign in
  //Provider used is passed to this call along with the appropriate
  //JSON for use when registering user with AWS
  startAWS(response, provider){
    this.response = response;
    console.log(this.response)

    if(provider == "Facebook"){
      if(this.response.authResponse){
        console.log("Facebook User is logged in " + this.response.authResponse.accessToken);

        // Add the Facebook access token to the Cognito credentials login map.
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: appConfig.identityPoolId,
          Logins: {
            'graph.facebook.com': this.response.authResponse.accessToken
          }
        });

        // set region if not set (as not set by the SDK by default)
        config.update({
          credentials: config.credentials,
          region: appConfig.region
        });

        // Obtain AWS credentials
        var err;
        AWS.config.credentials.get(function(err){
        });

        if(err){
          alert(err);
          return;
        }
        else{
          //TODO get information from facebook
          //TODO pull name from users table

          authStore.login("1", result.getIdToken().getJwtToken(), "Developer");
          //TODO move to explore page
        }
      }
    }
    else{
      console.log("Provider not yet supported")
    }

    //Tell the authStore that the user is signed in, //TODO with relavant information
    authStore.updateProfile("name", this.response.name, provider);
    return;
  }
}

/*const federatedAuthSignIn = new FederatedAuthSignIn;
//Whenever you import AuthStore you will get this above created AuthStore
window.federatedAuthSignIn = federatedAuthSignIn; // Exposes AuthStore globally*/
//export default federatedAuthSignIn;

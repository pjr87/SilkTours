/*
 FederatedAuthSignIn.js

Federated Identity Authentication Sign In
 Written by: Phillip Ryan

 Purpose is to provide link from federated ID to AWS

 TODO:
all
*/

//import cognito libraries
import AuthStore from "../../stores/AuthStore.js";
import { config, Config, CognitoIdentityCredentials, CognitoIdentityServiceProvider  } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import appConfig from "./config";
import * as service from '../../ajaxServices/AjaxList';

//React.Component is abstract base class
class FederatedAuthSignIn{
  //Constructor to initiate proxy if needed
  constructor(){
    if(!config.region)
      config.region = 'us-east-1';
  }

  //This function gets called upon a successful sign in
  //Provider used is passed to this call along with the appropriate
  //JSON for use when registering user with AWS
  startAWS(response, provider){
    this.response = response;
    console.log(this.response)

    if(provider == "Facebook"){
      console.log("Facebook User is logged in " + this.response.accessToken);

      // Add the Facebook access token to the Cognito credentials login map.
      config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: appConfig.identityPoolId,
        Logins: {
          'graph.facebook.com': this.response.accessToken
        }
      });

      // set region if not set (as not set by the SDK by default)
      config.update({
        credentials: config.credentials,
        region: appConfig.region
      });

      var name = this.response.name.split(" ");
      var email = this.response.email;

      // Obtain AWS credentials
      config.credentials.get(function(err){
        if (err) {
            alert(err);
        }
        else{
          var user1 = {
            accessKeyId: config.credentials.accessKeyId,
            secretAccessKey: config.credentials.secretAccessKey
          };

          var response;

          service.getUserByEmail(email).then(function(response){
            console.log("RESPONSE ");
            console.log(response.data);
            console.log(response.status);
            var id = response.data.id_users;
            if(response.status == 200){
              service.updateExistingUser(id, user1).then(function(response){
                console.log("RESPONSE ");
                console.log(response.data);
                console.log(response.status);

                AuthStore.login(id, config.credentials.secretAccessKey, "Developer");

                //TODO move to explore page
              });
            }
          });
        }
      });
    }
    else{
      console.log("Provider not yet supported")
    }

    return;
  }
}
const federatedAuthSignIn = new FederatedAuthSignIn;
//Whenever you import AuthStore you will get this above created AuthStore
window.federatedAuthSignIn = federatedAuthSignIn; // Exposes AuthStore globally
export default federatedAuthSignIn;

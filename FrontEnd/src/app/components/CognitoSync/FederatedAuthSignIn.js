/*
 FederatedAuthSignIn.js

Federated Identity Authentication Sign In
 Written by: Phillip Ryan

 Purpose is to provide link from federated ID to AWS

 TODO:
all
*/

//import cognito libraries
import { config, Config, CognitoIdentityCredentials, CognitoIdentityServiceProvider  } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import appConfig from "./config";
import * as service from '../../utils/databaseFunctions';

import { connect } from 'react-redux';
import { login } from '../../actions/AuthActions';

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

      let loginsIdpData = {};
      let loginsCognitoKey = 'graph.facebook.com';
      loginsIdpData[loginsCognitoKey] = this.response.accessToken;

      // Add the Facebook access token to the Cognito credentials login map.
      config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: appConfig.identityPoolId,
        Logins: loginsIdpData
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
          var id = config.credentials._identityId;
          var user1 = {
            Logins: loginsIdpData,
            IdentityId: id
          };

          var response;

          service.getUserByEmail(email, user1).then(function(response){
            if(response.data.email == email){
              service.updateExistingUser(response.data.id_users, user1).then(function(response){

                var fullName = name[0] + " " + name[1];

                //authStore.login(fullName, id, response.data.id_users, loginsIdpData, "Facebook");

                config.credentials.clearCachedId();

                //move to explore page
                //window.location.assign('..');
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


// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(FederatedAuthSignIn);

/*const federatedAuthSignIn = new FederatedAuthSignIn;
//Whenever you import FederatedAuthSignIn you will get this above created FederatedAuthSignIn
window.federatedAuthSignIn = federatedAuthSignIn; // Exposes FederatedAuthSignIn globally
export default federatedAuthSignIn;*/

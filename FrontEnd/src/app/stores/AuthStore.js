import { EventEmitter } from "events"

class AuthStore extends EventEmitter {
  constructor () {
    super();

    //This is the information stored on sign in
    // 1. ID token that contains user claims
    // 2. Access token that is used internally to perform authenticated calls
    // 3. Refresh token that is used internally to refresh the session after it expires each hour.
    this.authProfile =
    {
      /*
      secretAccessKey and identityID - Used with all ajax calls
      */
      email: "", //User's email
      secretAccessKey: "", //AWS secret access Key
      identityID: "", //Unique identityID assigned to user by AWS
      signedin: 0, //if signed in
      provider: "" //What service signed in with (Facebook, Developer)
    }
  }

  // ---------------
  // HELPERS
  // ---------------
  //This function is called when a user signs up
  //This funciton will update those listening
  signUp(email, identityID, secretAccessKey, provider){
    this.authProfile.email = email;
    this.authProfile.identityID = identityID;
    this.authProfile.secretAccessKey = secretAccessKey;
    this.authProfile.provider = provider;
    this.authProfile.signedin = 0;

    this.emit("signup");
  }

  setEmail(email){
    this.authProfile.email = email;
  }

  //This function is called when a user signs in
  //This funciton will update those listening
  login(identityID, secretAccessKey, provider){
    this.authProfile.identityID = identityID;
    this.authProfile.secretAccessKey = secretAccessKey;
    this.authProfile.provider = provider;
    this.authProfile.signedin = 1;

    this.emit("login");
  }

  //This function is called when a user logs off
  //This funciton will update those listening
  logout(){
    this.authProfile.identityID = 0;
    this.authProfile.provider = "";
    this.authProfile.signedin = 0;

    this.emit("logout");
  }

  //Will return boolean value if signed in or not
  signedIn() {
    if(this.authProfile.signedin == 1){
      return true;
    }
    else {
      return false;
    }
  }

  //Will return whole auth profile information
  getProfile(){
    if(this.signedIn()){
      return this.authProfile;
    }
    else {
      return 0
    }
  }

}

//Create new authStore
const authStore = new AuthStore;
//Whenever you import AuthStore you will get this above created AuthStore
window.authStore = authStore; // Exposes AuthStore globally*/
export default authStore;

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
      Logins and identityID - Used with all ajax calls
      */
      name: "", //User's name
      email: "", //User's email
      Logins: "", //AWS value needed to request secured endpoints
      identityID: "", //Unique identityID assigned to user by AWS
      id_user: "", //Primary key of user in users table
      signedin: 0, //if signed in
      provider: "" //What service signed in with (Facebook, Developer)
    }
  }

  // ---------------
  // HELPERS
  // ---------------
  //This function is called when a user signs up
  //This funciton will update those listening
  signUp(name, email, identityID, id_user, logins, provider){
    this.authProfile.name = name;
    this.authProfile.email = email;
    this.authProfile.identityID = identityID;
    this.authProfile.id_user = id_user;
    this.authProfile.Logins = logins;
    this.authProfile.provider = provider;
    this.authProfile.signedin = 0;

    this.emit("login");
  }

  setEmail(email){
    this.authProfile.email = email;
  }

  //This function is called when a user signs in
  //This funciton will update those listening
  login(name, identityID, id_user, logins, provider){
    this.authProfile.name = name;
    this.authProfile.identityID = identityID;
    this.authProfile.id_user = id_user;
    this.authProfile.Logins = logins;
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
    return this.authProfile;
  }
}

//Create new authStore
const authStore = new AuthStore;
//Whenever you import AuthStore you will get this above created AuthStore
window.authStore = authStore; // Exposes AuthStore globally
export default authStore;

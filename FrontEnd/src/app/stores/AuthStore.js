import { EventEmitter } from "events"

class AuthStore extends EventEmitter {
  constructor () {
    super();

    //This is the information stored on sign in
    this.authProfile =
    {
      id: 0, //AWS token
      name: "", //User's name
      signedin: 0, //if signed in
      provider: "" //What service signed in with (Facebook, Developer)
    }
  }

  // ---------------
  // HELPERS
  // ---------------
  //This function is called when a user signs in
  //This funciton will update those listening
  updateProfile(id, name, provider){
    this.authProfile.id = id;
    this.authProfile.name = name;
    this.authProfile.provider = provider;
    this.authProfile.signedin = 1;

    this.emit("login");
  }

  //This function is called when a user logs off
  //This funciton will update those listening
  logout(){
    this.authProfile.id = 0;
    this.authProfile.name = "";
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

  //Will return name of signed in member
  getName(){
    if(this.signedIn()){
      return this.authProfile.name;
    }
    else {
      return 0
    }
  }

}

//Create new authStore
const authStore = new AuthStore;
//Whenever you import AuthStore you will get this above created AuthStore
window.authStore = authStore; // Exposes AuthStore globally
export default authStore;

import axios from 'axios';
import AuthStore from '../stores/AuthStore';

/*
Every call must use
  secretAccessKey and identityID - Used with all ajax calls
  Can be seen from AuthStore
*/

export function getAllTours() {
    return axios.get("http://34.197.42.24:5000/search");
}

export function getUser(id){
    if(AuthStore.signedIn()){
      var url = "http://34.197.42.24:5000/users/"+id;
      console.log("url: "+url);
      return axios.get(url);
    }
    return false;
}

export function newTour(data){
    if(AuthStore.signedIn()){
      console.log(data);
      var url = "http://34.197.42.24:5000/tours";
      console.log("url: "+url);
      //var t = JSON.stringify(data);
      return axios.post(url, data);
   }
    return false;
}

/*Yes, send a POST to "/users" to create or a PUT to "/users/<id>" to edit.
 The arguments should be put in the HTTP request's form, and the JSON structure
 of the params is the same as the result of "http://34.197.42.24:5000/users/1"
 (although you only need to supply the values that you want to set).*/
export function registerNewUser(json) {
  console.log("Sending: " + json);
  return axios.post('http://34.197.42.24:5000/users', json);
}

export function updateExistingUser(email, json) {
  return axios.put('http://34.197.42.24:5000/users/' + email, json);
}

export function getUserByEmail(email) {
  return axios.get('http://34.197.42.24:5000/users/email/' + email);
}

import axios from 'axios';

window.SERVER_URL = "http://34.197.42.24:5000";
//window.SERVER_URL = "http://localhost:5000";
/*
Every call must use
  secretAccessKey and identityID - Used with all ajax calls
*/


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    return false;
}

export function getAllTours() {
    return axios.get(SERVER_URL + "/search");
}

export function getUser(id){
    var url = SERVER_URL + "/users/"+id;
    console.log("url: "+url);
    return axios.get(url, data);
}

export function newTour(data){
    console.log(data);
    var url = SERVER_URL + "/tours";
    console.log("url: "+url);
    //var t = JSON.stringify(data);
    return axios.post(url, data);
}

/*Yes, send a POST to "/users" to create or a PUT to "/users/<id>" to edit.
 The arguments should be put in the HTTP request's form, and the JSON structure
 of the params is the same as the result of "http://34.197.42.24:5000/users/1"
 (although you only need to supply the values that you want to set).*/
export function registerNewUser(json) {
  console.log("Sending: " + json);
  return axios.post(SERVER_URL + '/users', json);
}

export function updateExistingUser(id, json) {
  return axios.put(SERVER_URL + '/users/' + id, json);
}

export function getUserByEmail(email, json) {
  return axios.get(SERVER_URL + '/users/email/' + email, json);

}

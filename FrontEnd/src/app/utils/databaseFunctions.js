import axios from 'axios';

/*
Every call must use
  secretAccessKey and identityID - Used with all ajax calls
*/

export function getAllTours() {
    return axios.get("http://34.197.42.24:5000/search");
}

export function getUser(id,json){
    var url = "http://34.197.42.24:5000/users/"+id;
    console.log("url: "+url);
    return axios.get(url, json);
}

export function newTour(data){
    console.log(data);
    var url = "http://34.197.42.24:5000/tours";
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
  return axios.post('http://34.197.42.24:5000/users', json);
}

export function updateExistingUser(id, json) {
  return axios.put('http://34.197.42.24:5000/users/' + id, json);
}

export function getUserByEmail(email, json) {
  return axios.get('http://34.197.42.24:5000/users/email/' + email, json);
}

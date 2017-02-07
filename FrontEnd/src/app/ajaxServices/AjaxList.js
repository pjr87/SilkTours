import axios from 'axios';

export function getAllTours() {
    return axios.get('http://34.197.42.24:5000/search');
}

/*Yes, send a POST to "/users" to create or a PUT to "/users/<id>" to edit.
 The arguments should be put in the HTTP request's form, and the JSON structure
 of the params is the same as the result of "http://34.197.42.24:5000/users/1"
 (although you only need to supply the values that you want to set).*/
export function registerNewUser() {
  return axios.post('http://34.197.42.24:5000/users');
}

export function updateExistingUser(userName) {
  return axios.put('http://34.197.42.24:5000/users' + userName);
}

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
    if(authStore.signedIn()){
      var url = "http://34.197.42.24:5000/users/"+id;
      console.log("url: "+url);
      return axios.get(url);
    }
    return false;
}

export function newTour(data){
    if(authStore.signedIn()){
      console.log(data);
      var url = "http://34.197.42.24:5000/tours";
      console.log("url: " + url);
      //var t = JSON.stringify(data);
      return axios.post(url, data);
   }
    return false;
}

export function getMessages(){
  var url = 'https://demo5229068.mockable.io/messages';

  return axios.get(url);
}
export function updateUser(data){
    if(authStore.signedIn()){
      var url = "http://34.197.42.24:5000/users/"+data.id_users;
      //console.log("url: "+url);
      //var d = JSON.stringify(data);
      //console.log("value of d: ",d);
      return axios.put(url, data);
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

export function updateExistingUser(id, json) {
  return axios.put('http://34.197.42.24:5000/users/' + id, json);
}

export function getUserByEmail(email, json) {
  return axios.get('http://34.197.42.24:5000/users/email/' + email, json);
}

export function postSupportTicket(department, fname, lname, email, textBody) {
	var instance = axios.create({
	  baseURL: 'https://testtingsilk123.freshdesk.com/api/v2/tickets',
	  headers: {'Content-Type': 'application/json'},
	  auth: { username: 'KgANyaywWNjVCyUyQCe', password: 'x'}
	});

	var namee = fname + " "  + lname;


	var desc = JSON.stringify(textBody);
	var desc2 = desc.replace(/&/gm, "&amp;")
         .replace(/</gm, "&lt;")
         .replace(/>/gm, "&gt;")
         .replace(/'/gm, "&#039;").replace(/\\n|\\r\\n|\\r/gm, "<br />");




	var dataa = '{ "description": ' + desc2 + ', "subject": "Silk Contact Form", '+
								 '"email": "' + email + '", "type": "' + department + '", "priority": 1, "status": 2, "name": "' + namee + '"}';


	return instance.post('', dataa, instance);

}

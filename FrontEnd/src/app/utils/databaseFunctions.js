import axios from 'axios';

/**
* Gets the cookies for authentication
*/
function getCookie(name){
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for(var i=0;i < ca.length;i++) {
     var c = ca[i];
     while (c.charAt(0)==' ') c = c.substring(1,c.length);
     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
 }
 return null;
}

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

export function getFilteredTours(rating, priceMin, priceMax, keywords) {
    return axios.get(SERVER_URL + "/search?rating="+rating+"&piceMin="+priceMin+"&priceMax="+priceMax+"&keywords="+keywords);
}

export function getTourById(tourId) {
    return axios.get(SERVER_URL + "/tours/"+tourId);
}

export function getTourEventById(tourId){
    return axios.get(SERVER_URL + "/tour/"+tourId+"/events");
}

export function putTourEventById(eventid, json, auth) {
    console.log("url: " + url);
    console.log("json: " + json);
    let url = SERVER_URL + '/tourevents/' + eventid;
    return axios.put(url, json,
    {
      headers:{
        'Silk-Logins': auth.Logins,
        'Silk-Identity-Id': auth.IdentityId
      },
    });
}

export function putTourEvent(json, auth) {
    let url = SERVER_URL + '/tourevents';
    return axios.post(url, json,
    {
      headers:{
        'Silk-Logins': auth.Logins,
        'Silk-Identity-Id': auth.IdentityId
      },
    });
}

export function getAllTours() {
    return axios.get(SERVER_URL + "/search");
}

export function getUser(id){
    var url = SERVER_URL + "/users/"+id;
    console.log("url: "+url);
    return axios.get(url, data);

}

export function newTour(data, auth){
    let url = SERVER_URL + '/tours';
    return axios.post(url, data,
    {
      headers:{
        'Silk-Logins': auth.Logins,
        'Silk-Identity-Id': auth.IdentityId
      },
    });
}

export function newPhoto(data, id, auth){
    let url = SERVER_URL + '/tours/image/' + id;
    return axios.post(url, data,
    {
      headers:{
        'Silk-Logins': auth.Logins,
        'Silk-Identity-Id': auth.IdentityId
      },
    });
}

/*Yes, send a POST to "/users" to create or a PUT to "/users/<id>" to edit.
 The arguments should be put in the HTTP request's form, and the JSON structure
 of the params is the same as the result of "http://34.197.42.24:5000/users/1"
 (although you only need to supply the values that you want to set).*/
export function registerNewUser(json) {
  console.log("Sending: " + json);
  return axios.post(SERVER_URL + '/users', json);
}

export function updateExistingUser(id, json, auth) {
  let url = SERVER_URL + '/users/' + id;
  return axios.put(url, json,
    {
      headers:{
        'Silk-Logins': auth.Logins,
        'Silk-Identity-Id': auth.IdentityId
      },
    });
}

export function getUserByEmail(email, json) {
  let url = SERVER_URL + '/users/email/' + email;
  return axios.get(url, {
    headers:{
      'Silk-Logins': json.Logins,
      'Silk-Identity-Id': json.IdentityId
    }
  });
}


export function getMessages(){
        var url = 'https://demo5229068.mockable.io/messages';

        return axios.get(url);
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

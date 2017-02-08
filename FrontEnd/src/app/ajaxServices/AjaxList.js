import axios from 'axios';
import AuthStore from '../stores/AuthStore';

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

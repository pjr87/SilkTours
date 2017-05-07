//
//  BackendAPI.swift
//  BestOne
//
//  Created by Troy Santry on 5/1/17.
//  Copyright © 2017 AppsFoundation. All rights reserved.
//

import Foundation
import Alamofire
import AWSCognito

class BackendAPI{

    //OLD window.SERVER_URL = "http://34.197.42.24:5000";
    
    /*
     Every call must use
     secretAccessKey and identityID - Used with all ajax calls
     */
    
    static var credentials: NSDictionary?
    
    static let SERVER_URL = "http://silk-tours-dev.us-east-1.elasticbeanstalk.com";
//    func getUser(String id) {
//        Alamofire.request();
//    }
    
    static func login(email:String, password:String, completion: @escaping () -> Void) {
        let url = "\(SERVER_URL)/login"
        let parameters: [String: Any] = [
            "type" : "custom",
            "username" : email,
            "password" : password
        ]
        

        Alamofire.request(url, method: .post, parameters: parameters, encoding: JSONEncoding.default)
            .responseJSON { response in
                if let result = response.result.value {
                    credentials = result as? NSDictionary
                    completion()
                }
                print(response)
            }
    }
    
    static func register(email:String, password:String, completion: @escaping () -> Void) {
        let url = "\(SERVER_URL)/register"
        let parameters: [String: Any] = [
            "username" : email,
            "password" : password
        ]
        
        
        Alamofire.request(url, method: .post, parameters: parameters, encoding: JSONEncoding.default)
            .responseJSON { response in
                completion()
            }
    }
    
    static func sendConformCode(email:String, password:String, code:String, completion: @escaping (Bool) -> Void) {
        let url = "\(SERVER_URL)/confirm_sign_up"
        let parameters: [String: Any] = [
            "username" : email,
            "password" : password,
            "code": code
        ]
        
        
        Alamofire.request(url, method: .post, parameters: parameters, encoding: JSONEncoding.default)
            .responseJSON { response in
                if let result = response.result.value {
                    let json = result as? NSDictionary
                    if (json?.value(forKey: "error") != nil) {
                        completion(true)
                    } else {
                        credentials = json
                        completion(false)
                    }
                }
        }
    }
    
   
    func getFilteredTours(rating:String, priceMin:Float, priceMax:Float, keywords:String, page:String, page_size:Int) {
       // return Alamofire.request();
    }
    
    func getTourById(tourId:UInt64) {
    //return axios.get(SERVER_URL + "/tours/"+tourId);
    }
    
    func getTourEventById(tourId:UInt64){
    //return axios.get(SERVER_URL + "/tour/"+tourId+"/events");
    }
    
    static func putTourEventById(eventid:UInt64, json:String, auth:String) {
        let url = SERVER_URL + "/tourevents/" + String(eventid);
//    return axios.put(url, json,
//        {
//        headers:{
//            'Silk-Logins': auth.Logins,
//            'Silk-Identity-Id': auth.IdentityId
//        },
//    });
    }
    
    static func putTourEvent(json:String, auth:String) {
        let url = SERVER_URL + "/tourevents";
    //return axios.post(url, json,
//    {
//    headers:{
//    'Silk-Logins': auth.Logins,
//    'Silk-Identity-Id': auth.IdentityId
//    },
//    });
    }
    
     func getAllTours() {
        //return axios.get(SERVER_URL + "/search");
    }
    
    func getUser(id:UInt64){
        //var url = SERVER_URL + "/users/"+id;
        //return axios.get(url);
    }
    
    static func getUserById(id:UInt64, json:String) {
        let url = SERVER_URL + "/users/" + String(id);
//    return axios.get(url, {
//    headers:{
//    'Silk-Logins': json.Logins,
//    'Silk-Identity-Id': json.IdentityId
//    }
//    });
    }
    
    static func newTour(data:String, auth:String){
        let url = SERVER_URL + "/tours";
//    return axios.post(url, data,
//    {
//    headers:{
//    'Silk-Logins': auth.Logins,
//    'Silk-Identity-Id': auth.IdentityId
//    },
//    });
    }
    
//     func newPhoto(data, id, auth){
//    let url = SERVER_URL + '/media/' + id;
//    return axios.post(url, data,
//    {
//    headers:{
//    'Silk-Logins': auth.Logins,
//    'Silk-Identity-Id': auth.IdentityId
//    },
//    });
//    }
//    
//     func newTourProfilePhoto(data, id, auth){
//    let url = SERVER_URL + '/tours/' + id + '/profile';
//    return axios.put(url, data,
//    {
//    headers:{
//    'Silk-Logins': auth.Logins,
//    'Silk-Identity-Id': auth.IdentityId
//    },
//    });
//    }
//    
//     func newUserProfilePhoto(data, id, auth){
//    let url = SERVER_URL + '/users/' + id + '/profile';
//    return axios.put(url, data,
//    {
//    headers:{
//    'Silk-Logins': auth.Logins,
//    'Silk-Identity-Id': auth.IdentityId
//    },
//    });
//    }
    
    
    /*Yes, send a POST to "/users" to create or a PUT to "/users/<id>" to edit.
     The arguments should be put in the HTTP request's form, and the JSON structure
     of the params is the same as the result of "http://34.197.42.24:5000/users/1"
     (although you only need to supply the values that you want to set).*/
    func registerNewUser(json: String) {
    //return axios.post(SERVER_URL + '/users', json);
    }
    
    //func updateExistingUser(id, json, auth) {
    //let url = SERVER_URL + '/users/' + id;
//    return axios.put(url, json,
//    {
//    headers:{
//    'Silk-Logins': auth.Logins,
//    'Silk-Identity-Id': auth.IdentityId
//    },
//    });
   // }
    
     //func getUserByEmail(email, json) {
   // let url = SERVER_URL + '/users/email/' + email;
//    return axios.get(url, {
//    headers:{
//    'Silk-Logins': json.Logins,
//    'Silk-Identity-Id': json.IdentityId
//    }
//    });
  //  }
    
    
   //  func getMessages(){
   // var url = 'https://demo5229068.mockable.io/messages';
    
 //   return axios.get(url);
//    }
    
    
//     func postSupportTicket(department, fname, lname, email, textBody) {
//    var instance = axios.create({
//    baseURL: 'https://silktoursinc.freshdesk.com/api/v2/tickets',
//    headers: {'Content-Type': 'application/json'},
//    auth: { username: '0e7cUf93oqBAib5lwaN6', password: 'x'}
//    });
//    
//    var namee = fname + " "  + lname;
//    
//    
//    var desc = JSON.stringify(textBody);
//    var desc2 = desc.replace(/&/gm, "&amp;")
//    .replace(/</gm, "&lt;")
//    .replace(/>/gm, "&gt;")
//    .replace(/'/gm, "&#039;").replace(/\\n|\\r\\n|\\r/gm, "<br />");
//    
//    
//    
//    
//    var dataa = '{ "description": ' + desc2 + ', "subject": "Silk Contact Form", '+
//    '"email": "' + email + '", "type": "' + department + '", "priority": 1, "status": 2, "name": "' + namee + '"}';
//    
//    
//    return instance.post('', dataa, instance);
//    
//}
//
// func getPendingReviewsByUserId(userId, auth){
//    let url = SERVER_URL + '/pending_reviews/' + userId;
//    
//    return axios.get(url,
//                     {
//                        headers:{
//                            'Silk-Logins': auth.Logins,
//                            'Silk-Identity-Id': auth.IdentityId
//                        },
//    });
//}
//
// func postPendingReviewsByRatingComment(json, auth){
//    let url = SERVER_URL + '/ratings';
//    
//    return axios.post(url, json,
//                      {
//                        headers:{
//                            'Silk-Logins': auth.Logins,
//                            'Silk-Identity-Id': auth.IdentityId
//                        },
//    });
//}
//
// func putClearPendingReviewsByEventId(eventId, auth){
//    let url = SERVER_URL + '/clear_pending_review/' + eventId;
//    
//    return axios.put(url,
//                     {
//                        headers:{
//                            'Silk-Logins': auth.Logins,
//                            'Silk-Identity-Id': auth.IdentityId
//                        },
//    });
//}
//
    
    
    
    
}

//
//  BackendAPI.swift
//  BestOne
//
//  Created by Troy Santry on 5/1/17.
//  Copyright © 2017 AppsFoundation. All rights reserved.
//

import Foundation

//import UIKit

import SwiftyJSON
import Alamofire

class BackendAPI{

    //OLD window.SERVER_URL = "http://34.197.42.24:5000";
    
    /*
     Every call must use
     secretAccessKey and identityID - Used with all ajax calls
     */
    
    static var credentials: NSDictionary? = [
        "bypass": true
    ];
    static var user: JSON?
    
    static let SERVER_URL = "http://silk-tours-dev.us-east-1.elasticbeanstalk.com";
    
    
    static func getCurrentUserSync() -> JSON {
        if (user != nil) {
            return user!
        }
        let defaults = UserDefaults.standard
        let _user = defaults.object(forKey: "user")
        if (_user != nil) {
            let userString = _user as! String
            self.user = JSON(data:userString.data(using: String.Encoding.utf8)!)
            //self.user = JSON(userString)
            return user!
        }
        return JSON.null
    }
    
    static func getCurrentUserFromServer(email:String, completion: @escaping (JSON) -> Void) {
        let url = "\(SERVER_URL)/users/email/\(email)"
        Alamofire.request(url, method: .get, encoding: JSONEncoding.default)
            .responseJSON { response in
                if let result = response.result.value {
                    self.user = JSON(result)
                    let defaults = UserDefaults.standard
                    defaults.set(self.user?.rawString(String.Encoding.utf8), forKey: "user")
                    completion(self.user!)
                }
        }
    }
    
    static func login(email:String, password:String, completion: @escaping (_ user: JSON) -> Void) {
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
                    self.getCurrentUserFromServer(email: email, completion: {(user: JSON) -> Void in
                        completion(user)
                    })
                }
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

    static func getFavs(completion: @escaping ([JSON]) -> Void) {
        user = getCurrentUserSync()
        if user == JSON.null {
            gotoLogin()
            return
        }
        let user_id = user!["id_users"].int!
        let url = "\(SERVER_URL)/favorite_details/\(user_id)"
        let parameters = getCredentials()
        
        Alamofire.request(url, method: .post, parameters: parameters, encoding: JSONEncoding.default)
            .responseJSON { response in
                if let result = response.result.value {
                    let favs = JSON(result).array
                    completion(favs!)
                }
                print(response)
        }
    }
    
    static func toggleFav(tour_id : Int, completion: (() -> Void)?) {
        
        let url = "\(SERVER_URL)/toggle_favorite"
        user = getCurrentUserSync()
        if user == JSON.null {
            gotoLogin(back: false)
            return
        }
        let user_id = user?["id_users"].int!
        var parameters = getCredentials()
        parameters["bypass"] = true
        parameters["user_id"] = user_id
        parameters["tour_id"] = tour_id
        Alamofire.request(url, method: .post, parameters: parameters, encoding: JSONEncoding.default)
            .responseString { response in
                if completion != nil {
                    completion!()
                }
        }
    }

    static func getCredentials() -> [String: Any]  {
        return credentials as! [String : Any]
        /*let result:[String: Any] = [
            "Logins" : credentials!["Logins"]!,
            "IdentityId" : credentials!["IdentityId"]!
        ]
        return result
        */
    }
    
    static func getAllTours(completion:@escaping (_ j:JSON) -> Void)
    {
        user = getCurrentUserSync()
        var user_id = -1
        if user != JSON.null {
            user_id = (user?["id_users"].int)!
        }
        let config = URLSessionConfiguration.default
        let session = URLSession(configuration: config)
        let url = (
            (user_id == -1)
                ? "\(SERVER_URL)/search"
                : "\(SERVER_URL)/search?user_id=\(user_id)"
        );
        let urlRequest = URLRequest(url: URL(string: url)!)
        let task = session.dataTask(with: urlRequest) { (data, response, error) in
            // check for any errors
            guard error == nil else {
                print("error calling GET on /todos/1")
                return
            }
            // make sure we got data
            guard let _ = data else {
                print("Error: did not receive data")
                return
            }
            let json = JSON(data!)
            completion(json["data"])
        }
        task.resume()
    }
    
    static func gotoLogin(back:Bool?=true) {
        let vc = getViewController()
        if vc == nil {
            return
        }
        let alert = UIAlertController(title: "Login to Continue", message: "You must be logged in to see this content", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Go Back", style: UIAlertActionStyle.default, handler: {(action: UIAlertAction) -> Void in
            if !(back!) {
                return
            }
            let next = vc?.storyboard?.instantiateViewController(withIdentifier: "CollectionsController") as! UINavigationController
            vc?.present(next, animated: true, completion: nil)
        }))
        alert.addAction(UIAlertAction(title: "Login", style: UIAlertActionStyle.default, handler: {(action: UIAlertAction) -> Void in
            let next = vc?.storyboard?.instantiateViewController(withIdentifier: "LoginNC") as! UINavigationController
            vc?.present(next, animated: true, completion: nil)
        }))
        vc?.present(alert, animated: true, completion: nil)
    }
    internal static func getViewController() -> UIViewController? {
        if var topController = UIApplication.shared.keyWindow?.rootViewController {
            while let presentedViewController = topController.presentedViewController {
                topController = presentedViewController
            }
            return topController
        }
        return nil
    }
}

//
//  MessageController.swift
//  BestOne
//
//  Created by Andrew Shidel on 5/22/17.
//  Copyright © 2017 AppsFoundation. All rights reserved.
//

import Foundation
import Applozic
import SwiftyJSON

class MessageController {
    static func launchThread(sender: UIViewController, forUser: String) {
        let user = BackendAPI.getCurrentUserSync()
        if user == JSON.null {
            BackendAPI.gotoLogin(back: false)
            return
        }
        let alUser : ALUser =  ALUser();
        alUser.applicationId = ALChatManager.applicationId
        alUser.userId = user["id_users"].stringValue
        alUser.email = user["email"].stringValue
        alUser.imageLink = user["profile_picture"].stringValue
        alUser.displayName = user["first_name"].stringValue
        
        ALUserDefaultsHandler.setUserId(alUser.userId)
        ALUserDefaultsHandler.setEmailId(alUser.email)
        ALUserDefaultsHandler.setDisplayName(alUser.displayName)
        let chatManager : ALChatManager = ALChatManager(applicationKey: ALChatManager.applicationId as NSString)
        chatManager.registerUserAndLaunchChat(alUser, fromController: sender, forUser: forUser)
    }
    
    static func launchThreads(sender: UIViewController) {
        let user = BackendAPI.getCurrentUserSync()
        if user == JSON.null {
            BackendAPI.gotoLogin(back: false)
            return
        }
        let alUser : ALUser =  ALUser();
        alUser.applicationId = ALChatManager.applicationId
        alUser.userId = user["id_users"].stringValue
        alUser.email = user["email"].stringValue
        alUser.imageLink = user["profile_picture"].stringValue
        alUser.displayName = user["first_name"].stringValue
        
        ALUserDefaultsHandler.setUserId(alUser.userId)
        ALUserDefaultsHandler.setEmailId(alUser.email)
        ALUserDefaultsHandler.setDisplayName(alUser.displayName)
        let chatManager : ALChatManager = ALChatManager(applicationKey: ALChatManager.applicationId as NSString)
        chatManager.registerUserAndLaunchChat(alUser, fromController: sender, forUser: nil)
    }
}


//
//  ConfigurationManager.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class ConfigurationManager : NSObject {

    fileprivate(set) var appId : String!
    fileprivate(set) var contactMail : String!
    fileprivate(set) var rateAppDelay : String!
    fileprivate(set) var flurrySessionId : String!
    fileprivate(set) var mailSubject : String?
    
    static let sharedManager = ConfigurationManager()
    
    fileprivate override init() {
        if let path = Bundle.main.path(forResource: "Configuration", ofType: "plist"), let configurations = NSDictionary(contentsOfFile:path) {
            self.appId = configurations["AppId"] as! String
            self.contactMail = configurations["ContactMail"] as! String
            self.rateAppDelay = configurations["RateAppDelayInMinutes"] as! String
            self.flurrySessionId = configurations["FlurrySessionID"] as! String
            self.mailSubject = configurations["MailSubjectID"] as? String
        }
    }
}

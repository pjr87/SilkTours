//
//  SharingManager.swift
//  BestOne
//
//  Created by AppsFoundation on 7/29/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit
import MessageUI

class SharingManager: NSObject {
    
    static let sharedManager = SharingManager()
    
    // MARK: - Public Methods
    
    func inviteByMailFromViewController(_ controller: UIViewController) {
        let manager = ConfigurationManager.sharedManager
        let mailComposer = MFMailComposeViewController()
        
        //set delegate
        if controller.conforms(to: MFMailComposeViewControllerDelegate.self) {
            mailComposer.mailComposeDelegate = controller as? MFMailComposeViewControllerDelegate
        } else {
            mailComposer.mailComposeDelegate = self
        }
        
        if MFMailComposeViewController.canSendMail() {
            mailComposer.setToRecipients([manager.contactMail])
            if let mailSubject = manager.mailSubject {
                mailComposer.setSubject(mailSubject)
            }
            
            controller.present(mailComposer, animated: true, completion: nil)
        }
    }
}

// MARK: - MFMailComposeViewControllerDelegate
extension SharingManager: MFMailComposeViewControllerDelegate {
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        switch result.rawValue {
        case MFMailComposeResult.cancelled.rawValue:
            print("Mail cancelled")
            break
        case MFMailComposeResult.saved.rawValue:
            print("Mail saved")
            break
        case MFMailComposeResult.sent.rawValue:
            print("Mail sent")
            break
        case MFMailComposeResult.failed.rawValue:
            print("Mail failed")
            break
        default:
            break
        }
        controller.dismiss(animated: true, completion: nil)
    }
}

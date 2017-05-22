//
//  LoginViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/30/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit
import SwiftyJSON

class LoginViewController: UIViewController {
    
    @IBOutlet weak var emailTxtFld: UITextField!
    @IBOutlet weak var passwordTxtFld: UITextField!
    @IBOutlet weak var mainScrollViewBottomConstraint: NSLayoutConstraint?
    @IBOutlet weak var scrollView: UIScrollView?
    fileprivate var isKeyboardShown: Bool = false

    @IBOutlet weak var logo: UIImageView!
    @IBOutlet weak var logoContainer: UIView!

    
    override func viewDidLoad() {
        super.viewDidLoad()
        //add observers for keyboard
        NotificationCenter.default.addObserver(self, selector: #selector(LoginViewController.keyboardWillChangeFrame(_:)), name: NSNotification.Name(rawValue: "UIKeyboardWillChangeFrameNotification"), object: nil)
        logo.layer.cornerRadius = logo.frame.size.width/2
        logo.clipsToBounds = true
        //logoContainer.layer.borderColor = UIColor(red: 140/255.0, green: 89/255.0, blue: 135/255.0, alpha: 1.0).cgColor
        //logoContainer.layer.borderWidth = 10
        //logoContainer.transform = logoContainer.transform.rotated(by: CGFloat(Double.pi/4))
        //BackendAPI.getCurrentUser(email: "andrew@shidel.com", completion: {(user:JSON) -> Void in
        //    print(user.string ?? "user not found")
        //})
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Private Methods
    func keyboardWillChangeFrame(_ notification: Notification) {
        if let keyboardHeight: CGFloat = (notification.userInfo?[UIKeyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue.height {
            mainScrollViewBottomConstraint?.constant = isKeyboardShown == true ? keyboardHeight : 0
            view.updateConstraints()
        }
    }
    
    // MARK: - Actions
    @IBAction func onSignInBtnClicked(_ sender: AnyObject) {
        print("Button \"Sign in\" was clicked")
        //email = emailTxtFld?.text
        BackendAPI.login(email: emailTxtFld.text!, password: passwordTxtFld.text!, completion: {(user: JSON) -> Void in
            self.performSegue(withIdentifier: "showMenu", sender: self)
        })
    }
    
    @IBAction func onRegisterBtnClicked(_ sender: Any) {
        let email = emailTxtFld.text!
        let password = passwordTxtFld.text!
        BackendAPI.register(email: email, password: password, completion: {() -> Void in
            self.promptAndSendCode(email:email, password:password)
        })
    }
    
    func promptAndSendCode(email:String, password:String, retry:Bool=false) {
        let title = (retry ? "Invalid Code" : "Enter Conformation Code")
        let alert = UIAlertController(title: title, message: "A confirmation code was sent to \(email). Please enter it bellow.", preferredStyle: .alert)
        alert.addTextField { (textField) in
            textField.text = "Confirmation Code"
        }
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { [weak alert] (_) in
            let textField = alert?.textFields![0]
            print("Text field: \(textField!.text ?? "Text not found")")
            BackendAPI.sendConformCode(email: email, password: password, code: (textField?.text)!, completion: {(error: Bool) -> Void in
                if (error) {
                    self.promptAndSendCode(email: email, password: password)
                } else {
                    self.performSegue(withIdentifier: "showMenu", sender: self)
                }
            })
        }))
        self.present(alert, animated: true, completion: nil)
    }
    
    @IBAction func onSignInWithFacebookClicked(_ sender: AnyObject) {
        print("Button \"Sign in with facebook\" was clicked")
        performSegue(withIdentifier: "showMenu", sender: self)
    }
    
    @IBAction func onSignInWithTwitterClicked(_ sender: AnyObject) {
        print("Button \"Sign in with twitter\" was clicked")
        performSegue(withIdentifier: "showMenu", sender: self)
    }
    
    @IBAction func onForgotPasswordBtnClicked(_ sender: AnyObject) {
        print("Button \"Forgot Password?\" was clicked")
    }
    
    @IBAction func onSignUpBtnClicked(_ sender: AnyObject) {
        print("Button \"Sign up\" was clicked")
        performSegue(withIdentifier: "register", sender: self)
    }
}

// MARK: - UITextFieldDelegate
extension LoginViewController: UITextFieldDelegate {
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField == emailTxtFld { //move to "password" text field
            passwordTxtFld?.becomeFirstResponder()
        } else if textField == passwordTxtFld {
            isKeyboardShown = false
            textField.resignFirstResponder()
        }
        return true
    }
    
    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        isKeyboardShown = true
        return true
    }
}

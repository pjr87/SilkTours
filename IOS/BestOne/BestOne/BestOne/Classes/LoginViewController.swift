//
//  LoginViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/30/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    
    @IBOutlet weak var emailTxtFld: UITextField?
    @IBOutlet weak var passwordTxtFld: UITextField?
    @IBOutlet weak var mainScrollViewBottomConstraint: NSLayoutConstraint?
    @IBOutlet weak var scrollView: UIScrollView?
    fileprivate var isKeyboardShown: Bool = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //add observers for keyboard
        NotificationCenter.default.addObserver(self, selector: #selector(LoginViewController.keyboardWillChangeFrame(_:)), name: NSNotification.Name(rawValue: "UIKeyboardWillChangeFrameNotification"), object: nil)
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
        performSegue(withIdentifier: "showMenu", sender: self)
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

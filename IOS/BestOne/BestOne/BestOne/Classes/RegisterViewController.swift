import UIKit

class RegisterViewController: UIViewController {
    static var email: String?
    static var password: String?

    @IBOutlet weak var emailView: UITextField!
    @IBOutlet weak var passwordView: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()
        UINavigationBar.appearance().titleTextAttributes = [NSForegroundColorAttributeName: UIColor.black]
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func onUserDetailDone(_ sender: Any) {
        RegisterViewController.email = emailView.text
        RegisterViewController.password = passwordView.text
        self.performSegue(withIdentifier: "interests", sender: self)
    }

    
    @IBAction func onRegisterDone(_ sender: Any) {
        let email = RegisterViewController.email!
        let password = RegisterViewController.password!
        BackendAPI.register(email: email, password: password, completion: {() -> Void in
            self.promptAndSendCode(email: email, password: password)
        })
    }
    
    func promptAndSendCode(email:String, password:String, retry:Bool=false) {
        let title = (retry ? "Invalid Code" : "Enter Conformation Code")
        let alert = UIAlertController(title: title, message: "A confirmation code was sent to \(email). Please enter it bellow.", preferredStyle: .alert)
        alert.addTextField { (textField) in
            textField.placeholder = "Confirmation Code"
        }
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { [weak alert] (_) in
            let textField = alert?.textFields![0]
            print("Text field: \(textField!.text ?? "Text not found")")
            BackendAPI.sendConformCode(email: email, password: password, code: (textField?.text)!, completion: {(error: Bool) -> Void in
                if (error) {
                    self.promptAndSendCode(email: email, password: password)
                } else {
                    self.performSegue(withIdentifier: "regToMain", sender: self)
                }
            })
        }))
        self.present(alert, animated: true, completion: nil)
    }
}

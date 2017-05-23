//
//  MenuViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/30/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private enum MenuItemType: Int {
    case collections = 0
    case favorites
    case myCart
    case messages
    case settings
    case logOut
}

private let RowHeightCoef = 0.077211
private let CellIdentifier = "MenuTableViewCell"
private var menuController: UIViewController? = nil

class MenuViewController: UIViewController {
    
    @IBOutlet weak var menuTableView: UITableView?
    fileprivate var menuItems: [MenuItem] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        menuController = self
        //load menu items
        menuItems = MenuManager.sharedManager.loadData()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        menuTableView?.reloadData()
    }
}

// MARK: - UITableViewDataSource
extension MenuViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return menuItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifier) as! MenuTableViewCell
        let menuItem = menuItems[indexPath.row]
        cell.titleLbl?.text = menuItem.title
        cell.iconImgView?.image = UIImage(named: menuItem.iconTitle)
        cell.iconImgTitle = menuItem.iconTitle
        if indexPath.row == MenuItemType.myCart.rawValue {
            cell.cartCountLbl?.text = String(CartManager.sharedManager.cartItems.count)
        }
        else {
            cell.cartCountLbl?.text = nil
        }
        return cell
    }
}

// MARK: - UITableViewDelegate
extension MenuViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return CGFloat(RowHeightCoef) * view.frame.height
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        if indexPath.row == MenuItemType.logOut.rawValue { //log out
            _ = navigationController?.popViewController(animated: true)
            return
        }
        
        //set white/black status bar theme
        if indexPath.row == MenuItemType.settings.rawValue {
            (slidingPanelController as! ContainerViewController).shouldBlackStatusBar = true
        } else {
            (slidingPanelController as! ContainerViewController).shouldBlackStatusBar = false
        }
        
        //get selected menu item
        let menuItem = menuItems[indexPath.row]
        
        //show next controller
        let nextControllerId = menuItem.title.replacingOccurrences(of: " ", with: "") + "Controller"
        if nextControllerId.contains("Message") {
            MessageController.launchThreads(sender: menuController!)
        } else {
            slidingPanelController.centerViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: nextControllerId)
        }
        slidingPanelController.closePanel()
    }
}

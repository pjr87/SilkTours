//
//  BaseViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/30/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class BaseViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //make navigation bar transparent
        navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarMetrics.default)
        navigationController?.navigationBar.shadowImage = UIImage()
        navigationController?.view.backgroundColor = UIColor.clear
        
        //create back button
        navigationItem.leftBarButtonItem = ThemeManager.sharedManager.styledWhiteBackButtonWithTarget(self, action: #selector(BaseViewController.didClickedBackBtn(_:)))
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Public Methods
    
    func didClickedBackBtn(_ sender: AnyObject) {
        if navigationController?.viewControllers.count == 1 { //show menu
            slidingPanelController.openLeftPanel()
        } else { //go back
            _ = navigationController?.popViewController(animated: true)
        }
    }
}

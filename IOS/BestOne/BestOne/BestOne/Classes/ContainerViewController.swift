//
//  ContainerViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let LeftPanelMaxWidthPercent = 0.75

class ContainerViewController: MSSlidingPanelController {

    var shouldBlackStatusBar: Bool = false
    
    override func viewDidLoad() {
        super.viewDidLoad()

        leftPanelMaximumWidth = view.frame.width * CGFloat(LeftPanelMaxWidthPercent)
        setNeedsStatusBarAppearanceUpdate()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override var preferredStatusBarStyle : UIStatusBarStyle {
        if shouldBlackStatusBar {
            return UIStatusBarStyle.default
        } else {
            return UIStatusBarStyle.lightContent
        }
    }
}

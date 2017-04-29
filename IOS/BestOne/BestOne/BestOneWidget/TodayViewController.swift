//
//  TodayViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 9/14/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit
import NotificationCenter

class TodayViewController: UIViewController {
        
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    func widgetPerformUpdate(completionHandler: (@escaping (NCUpdateResult) -> Void)) {
        completionHandler(NCUpdateResult.newData)
    }
    
}

// MARK: - NCWidgetProviding
extension TodayViewController: NCWidgetProviding {
    
    func widgetMarginInsets(forProposedMarginInsets defaultMarginInsets: UIEdgeInsets) -> UIEdgeInsets {
        var defaultMarginInsets = defaultMarginInsets
        defaultMarginInsets.left = 0.0
        defaultMarginInsets.bottom = 0.0
        return defaultMarginInsets
    }
    
}

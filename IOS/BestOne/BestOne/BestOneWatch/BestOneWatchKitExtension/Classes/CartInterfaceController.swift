//
//  CartInterfaceController.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import WatchKit
import Foundation

class CartInterfaceController: ShopInterfaceController {
    
    // MARK: - Properties
    
    @IBOutlet weak var totalLabel: WKInterfaceLabel!
    
    // MARK: - Interface Life Cycle
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        //count total price
        var totalCount = 0

        for item in items {
            totalCount += Int(item.price)!
        }
        
        totalLabel.setText("$\(totalCount)")
    }

    // MARK: - Actions
    
    @IBAction func onEmptyCartClicked() {
        items = []
        
        configureTable()
        
        totalLabel.setText("$0")
    }
}

//
//  ShopInterfaceController.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import WatchKit
import Foundation

class ShopInterfaceController: WKInterfaceController {
    
    // MARK: - Types
    
    struct Constants {
        static let rowType = "ShopRowType"
        
        struct Context {
            static let itemsKey = "items"
            static let titleKey = "title"
        }
    }
    
    // MARK: - Properties
    
    @IBOutlet weak var shopTable: WKInterfaceTable!
    
    var items: [ShopItem] = []
    
    // MARK: - Interface Life Cycle
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        if let contextDictionary = context as? [String: AnyObject] {
            if let shopItems = contextDictionary[Constants.Context.itemsKey] as? [ShopItem] {
                items = shopItems
            }
            
            if let controllerTitle = contextDictionary[Constants.Context.titleKey] as? String {
                setTitle(controllerTitle)
            }
        }
        
        configureTable()
    }
    
    override func willActivate() {
        super.willActivate()
    }
    
    override func didDeactivate() {
        super.didDeactivate()
    }
    
    // MARK: - Table Method
    
    func configureTable() {
        if shopTable.numberOfRows != items.count {
            shopTable.setNumberOfRows(items.count, withRowType: Constants.rowType)
        }
        
        for (index, item) in items.enumerated() {
            if let row = shopTable.rowController(at: index) as? ShopRowType {
                row.imageGroup.setBackgroundImageNamed(item.imgTitle)
                row.priceLabel.setText("$" + item.price)
            }
        }
    }
    
    override func contextForSegue(withIdentifier segueIdentifier: String, in table: WKInterfaceTable, rowIndex: Int) -> Any? {
        return items[rowIndex]
    }
}

//
//  CollectionsInterfaceController.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import WatchKit
import Foundation

class CollectionsInterfaceController: WKInterfaceController {

    // MARK: - Types
    
    struct Constants {
        static let rowType = "CollectionRowType"
        
        struct Context {
            static let itemsKey = "items"
            static let titleKey = "title"
        }
    }
    
    // MARK: - Properties
    
    @IBOutlet weak var collectionsTable: WKInterfaceTable!
    
    var collections: [CollectionItem] = []
    
    // MARK: - Interface Life Cycle
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        collections = CollectionsManager.sharedManager.loadData()

        configureTable()
    }

    override func willActivate() {
        super.willActivate()
    }

    override func didDeactivate() {
        super.didDeactivate()
    }
    
    // MARK: - Table Methods
    
    func configureTable() {
        if collectionsTable.numberOfRows != collections.count {
            collectionsTable.setNumberOfRows(collections.count, withRowType: Constants.rowType)
        }
        
        for (index, collection) in collections.enumerated() {
            if let row = collectionsTable.rowController(at: index) as? CollectionRowType {
                row.titleLabel.setText(collection.title)
                row.subTitleLabel.setText(collection.details)
                row.backgroundGroup.setBackgroundImageNamed(collection.imgTitle)
            }
        }
    }
    
    override func contextForSegue(withIdentifier segueIdentifier: String, in table: WKInterfaceTable, rowIndex: Int) -> Any? {

        let collection = collections[rowIndex]
        let shopItemsByCollection = ShopManager.sharedManager.loadData()
        
        return [Constants.Context.itemsKey: shopItemsByCollection, Constants.Context.titleKey: collection.title.capitalized]
    }
}

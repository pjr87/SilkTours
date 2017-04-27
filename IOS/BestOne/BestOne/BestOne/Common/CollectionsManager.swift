//
//  CollectionsManager.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class CollectionsManager: NSObject {

    static let sharedManager = CollectionsManager()
    
    fileprivate override init() {}
    
    // MARK: - Public Methods
    
    func loadData() -> [CollectionItem] {
        let path = Bundle.main.path(forResource: "CollectionItems", ofType: "plist")
        if let dataArray = NSArray(contentsOfFile: path!) as? [[String:Any]] {
            return constructCollectionItemsFromArray(dataArray)
        } else {
            return [CollectionItem]()
        }
    }
    
    // MARK: - Private Methods
    
    fileprivate func constructCollectionItemsFromArray(_ array: [[String:Any]]) -> [CollectionItem] {
        var resultItems = [CollectionItem]()
        
        for object in array {
            let loadedCollectionItem = CollectionItem(title: object["title"] as! String, imgTitle: object["imgTitle"] as! String, details: object["details"] as! String, saleMode: SaleMode(rawValue: object["saleMode"] as! Int)!)
            resultItems.append(loadedCollectionItem)
        }
        return resultItems
    }
}

//
//  DataManager.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class ShopManager: NSObject {
    
    static let sharedManager = ShopManager()
    let backend = BackendAPI()
    
    fileprivate override init() {}

    // MARK: - Public Methods
    
    func loadData() -> [ShopItem] {
        
        backend.getAllTours() { (data) in
            //let subject = data["subject"] as? [AnyObject]
            print(data)
        }
        
        let path = Bundle.main.path(forResource: "ShopItems", ofType: "plist")
        if let dataArray = NSArray(contentsOfFile: path!) as? [[String:Any]] {
            return constructShopItemsFromArray(dataArray)
        } else {
            return [ShopItem]()
        }
    }

    
    // MARK: - Private Methods
    
    fileprivate func constructShopItemsFromArray(_ array: [[String:Any]]) -> [ShopItem] {
        var resultItems = [ShopItem]()
        
        for object in array {
            let loadedShopItem = ShopItem(title: object["title"] as! String, imgTitle: object["imgTitle"] as! String, subTitle: object["subTitle"] as! String, price: object["price"] as! String, information: object["information"] as! String, previewImgs: object["previewImgs"] as! [String], saleModePosition: SaleModePosition(rawValue: object["saleModePosition"] as! Int)!, saleMode: SaleMode(rawValue: object["saleMode"] as! Int)!)
            resultItems.append(loadedShopItem)
        }
        return resultItems
    }
}

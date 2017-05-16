//
//  DataManager.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit
import SwiftyJSON

class ShopManager: NSObject {
    
    static let sharedManager = ShopManager()
    //let backend = BackendAPI()
    
    fileprivate override init() {}

    // MARK: - Public Methods
    
    func loadData() -> [ShopItem] {
        var d:JSON? = nil
        
        BackendAPI.getAllTours() { (data) in
            //let subject = data["subject"] as? [AnyObject]
            print(data[0]["description"])
            d=data;
        //semaphore.signal()
            //print(d)

        }
        
        //semaphore.wait()
        
        print(d?[0])
        
        return constructShopItemsFromArray(d!)
        
        //old
//        let path = Bundle.main.path(forResource: "ShopItems", ofType: "plist")
//        if let dataArray = NSArray(contentsOfFile: path!) as? [[String:Any]] {
//            return constructShopItemsFromArray(dataArray)
//        } else {
//            return [ShopItem]()
//        }
    }

    
    // MARK: - Private Methods
    
    fileprivate func constructShopItemsFromArray(_ array:JSON) -> [ShopItem] {
        var resultItems = [ShopItem]()
        
//        for object in array {
//            let loadedShopItem = ShopItem(title: object["Tour"] as! String, imgTitle: object["imgTitle"] as! String, subTitle: object["subTitle"] as! String, price: object["price"] as! String, information: object["information"] as! String, previewImgs: object["previewImgs"] as! [String], saleModePosition: SaleModePosition(rawValue: object["saleModePosition"] as! Int)!)
//            resultItems.append(loadedShopItem)
//        }
        
        for i in 0..<array.count{
            
                       
            print(array[i]["language"].string!)
             let loadedShopItem = ShopItem(title: array[i]["name"].string!, imgTitle: array[i]["profile_image"].string! , subTitle: array[i]["language"].string! , price: String(format:"%.0f", array[i]["price"].floatValue), information: array[i]["name"].string! , previewImgs: [array[i]["profile_image"].string!] , saleModePosition: SaleModePosition(rawValue:0)!)
            resultItems.append(loadedShopItem)
        }
        
        return resultItems
    }
}

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
    
    fileprivate override init() {}
    
    func loadData(completion: @escaping ([ShopItem]) -> Void){
        BackendAPI.getAllTours() { (data) in
            //print(data[0]["description"])
            let d=data;
            completion(self.constructShopItemsFromArray(d))
        }
    }

    
    fileprivate func constructShopItemsFromArray(_ array:JSON) -> [ShopItem] {
        var resultItems = [ShopItem]()
        
        for i in 0..<array.count{
            
                       
            //print(array[i]["language"].string!)
            let loadedShopItem = ShopItem(json: array[i], id: array[i]["id_tour"].int!, is_fav: array[i]["is_fav"].bool!, title: array[i]["name"].string!, imgTitle: array[i]["profile_image"].string! , subTitle: array[i]["language"].string! , price: String(format:"%.0f", array[i]["price"].floatValue), information: array[i]["name"].string! , previewImgs: [array[i]["profile_image"].string!], saleModePosition: SaleModePosition(rawValue:0)!)
            resultItems.append(loadedShopItem)
        }
        
        return resultItems
    }
}

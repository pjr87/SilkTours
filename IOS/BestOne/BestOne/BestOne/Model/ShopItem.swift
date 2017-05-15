//
//  ShopItem.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

@objc (ShopItem)
class ShopItem: NSObject, NSCoding {
    
    var title: String
    var imgTitle: String
    var subTitle: String
    var price: String
    var information: String
    var previewImgs: [String]
    var saleModePosition: SaleModePosition
    
    init(title: String, imgTitle: String, subTitle: String, price: String, information: String, previewImgs: [String], saleModePosition: SaleModePosition) {
        self.title = title
        self.imgTitle = imgTitle
        self.subTitle = subTitle
        self.price = price
        self.information = information
        self.previewImgs = previewImgs
        self.saleModePosition = saleModePosition
        
    }
    
    override func isEqual(_ object: Any?) -> Bool {
        if let object = object as? ShopItem {
            if title == object.title &&
                subTitle == object.subTitle &&
                price == object.price &&
                information == object.information {
                    return true
            } else {
                return false
            }
        }
        return false
    }
    
    // MARK: - NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(title, forKey: "title")
        aCoder.encode(price, forKey: "price")
        aCoder.encode(imgTitle, forKey: "imgTitle")
        aCoder.encode(subTitle, forKey: "subTitle")
        aCoder.encode(information, forKey: "information")
        aCoder.encode(previewImgs, forKey: "previewImgs")
        aCoder.encode(saleModePosition.rawValue, forKey: "saleModePosition")
    }
    
    required init?(coder aDecoder: NSCoder) {
        title = aDecoder.decodeObject(forKey: "title") as! String
        price = aDecoder.decodeObject(forKey: "price") as! String
        imgTitle = aDecoder.decodeObject(forKey: "imgTitle") as! String
        subTitle = aDecoder.decodeObject(forKey: "subTitle") as! String
        information = aDecoder.decodeObject(forKey: "information") as! String
        previewImgs = aDecoder.decodeObject(forKey: "previewImgs") as! [String]
        saleModePosition = SaleModePosition(rawValue: aDecoder.decodeObject(forKey: "saleModePosition") as! Int)!
    }
}


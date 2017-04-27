//
//  CartManager.swift
//  BestOne
//
//  Created by AppsFoundation on 7/29/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let UserDefaultsCartKey = "CartUserDefaultsKey"
private let UserDefaultsGroup = "group.com.AppsFoundation.BestOne" //Note: group Id should be equal everywhere through the app

class CartManager: NSObject {

    fileprivate(set) var cartItems: [ShopItem] = []
    static let sharedManager = CartManager()
    
    fileprivate override init() {
        super.init()
        cartItems = openFromMemory()
    }
    
    // MARK: - Public Methods
    
    func addShopItem(_ item: ShopItem) {
        cartItems.append(item)
        saveCurrentCart()
    }
    
    func removeShopItem(_ item: ShopItem) {
        if let index = cartItems.index(of: item) {
            cartItems.remove(at: index)
        }
        saveCurrentCart()
    }
    
    func saveCurrentCart() {
        let defaults = UserDefaults.standard
        var archivedItems = [AnyObject]()
        
        for item in cartItems {
            archivedItems.append(NSKeyedArchiver.archivedData(withRootObject: item) as AnyObject)
        }
        defaults.set(archivedItems, forKey: UserDefaultsCartKey)
        defaults.synchronize()
        
        // Save data into the group defaults with group id for watch app and widget app
        if let groupDefaults = UserDefaults(suiteName: UserDefaultsGroup) {
            groupDefaults.set(NSKeyedArchiver.archivedData(withRootObject: archivedItems), forKey: UserDefaultsCartKey)
            groupDefaults.synchronize()
        }
    }
    
    // MARK: - Private Methods
    fileprivate func openFromMemory() -> [ShopItem] {
        let defaults = UserDefaults.standard
        var favoriteItems = [ShopItem]()
        
        if let encodedObjects = defaults.object(forKey: UserDefaultsCartKey) {
            for object in (encodedObjects as! [Data]) {
                if let unarchivedObject = NSKeyedUnarchiver.unarchiveObject(with: object) as? ShopItem {
                    favoriteItems.append(unarchivedObject)
                }
            }
        }
        return favoriteItems
    }
}

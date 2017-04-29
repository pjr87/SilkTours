//
//  FavoriteItemsManager.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let UserDefaultsFavoriteKey = "FavoriteItemsUserDefaultsKey"
private let UserDefaultsGroup = "group.com.AppsFoundation.BestOne" //Note: group Id should be equal everywhere through the app

class FavoriteItemsManager: NSObject {
    
    fileprivate(set) var items: [ShopItem] = []
    static let sharedManager = FavoriteItemsManager()
    
    fileprivate override init() {
        super.init()
        items = openFromMemory()
    }
    
    // MARK: - Public Methods
    
    func addItem(_ item: ShopItem) {
        items.append(item)
        saveInMemory()
    }
    
    func removeItem(_ item: ShopItem) {
        if let index = items.index(of: item) {
            items.remove(at: index)
        }
        saveInMemory()
    }
    
    // MARK: - Private Methods
    
    fileprivate func saveInMemory() {
        let defaults = UserDefaults.standard
        var archivedItems = [AnyObject]()
        
        for item in items {
            archivedItems.append(NSKeyedArchiver.archivedData(withRootObject: item) as AnyObject)
        }
        defaults.set(archivedItems, forKey: UserDefaultsFavoriteKey)
        defaults.synchronize()
        
        // Save data into the group defaults with group id for watch app and widget app
        if let groupDefaults = UserDefaults(suiteName: UserDefaultsGroup) {
            groupDefaults.set(NSKeyedArchiver.archivedData(withRootObject: archivedItems), forKey: UserDefaultsFavoriteKey)
            groupDefaults.synchronize()
        }
    }
    
    fileprivate func openFromMemory() -> [ShopItem] {
        let defaults = UserDefaults.standard
        var favoriteItems = [ShopItem]()
        
        if let encodedObjects = defaults.object(forKey: UserDefaultsFavoriteKey) {
            for object in (encodedObjects as! [Data]) {
                if let unarchivedObject = NSKeyedUnarchiver.unarchiveObject(with: object) as? ShopItem {
                    favoriteItems.append(unarchivedObject)
                }
            }
        }
        return favoriteItems
    }
}

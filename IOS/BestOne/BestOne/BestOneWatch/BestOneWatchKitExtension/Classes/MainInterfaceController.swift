//
//  MainInterfaceController.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import WatchKit
import Foundation


class MainInterfaceController: WKInterfaceController {
    
    // MARK: - Types
    
    struct Constants {
        struct StoryboardIdentifiers {
            static let collectionsController = "CollectionsInterfaceController"
            static let shopController = "ShopInterfaceController"
            static let cartController = "CartInterfaceController"
        }
        
        struct GroupDefaults {
            static let groupTitle = "group.com.AppsFoundation.BestOne" //Note: group Id should be equal everywhere through the app
            static let favoriteKey = "FavoriteItemsUserDefaultsKey"
            static let cartKey = "CartUserDefaultsKey"
        }
        
        struct Context {
            static let itemsKey = "items"
            static let titleKey = "title"
        }
    }
    
    // MARK: - Interface Life Cycle
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
    }
    
    override func willActivate() {
        super.willActivate()
        
        let favoriteItems = fetchFavoriteItems()
        let cartItems = fetchCartItems()
        
        WKInterfaceController.reloadRootControllers(
            withNames: [
                Constants.StoryboardIdentifiers.collectionsController,  //collections
                Constants.StoryboardIdentifiers.shopController,         //favorites
                Constants.StoryboardIdentifiers.cartController],        //cart
            contexts: [
                [],                 // empty for collection controller
                [Constants.Context.itemsKey: favoriteItems, Constants.Context.titleKey: "Favorites"],   // items & title for favorite controller
                [Constants.Context.itemsKey: cartItems]       // cart items for cart controller
            ]
        )
    }
    
    override func didDeactivate() {
        super.didDeactivate()
    }
    
    // MARK: - Fetch Methods
    
    fileprivate func fetchFavoriteItems() -> [ShopItem] {
        var favoriteItems: [ShopItem] = []
        if let groupDefaults = UserDefaults(suiteName: Constants.GroupDefaults.groupTitle) {
            if let object = groupDefaults.object(forKey: Constants.GroupDefaults.favoriteKey) as? Data, let encodedObjects = NSKeyedUnarchiver.unarchiveObject(with: object) as? [Data] {
                for object in encodedObjects {
                    if let unarchivedObject = NSKeyedUnarchiver.unarchiveObject(with: object) as? ShopItem {
                        favoriteItems.append(unarchivedObject)
                    }
                }
                return favoriteItems
            } else {
                return favoriteItems
            }
        } else {
            return favoriteItems
        }
    }
    
    fileprivate func fetchCartItems() -> [ShopItem] {
        var cartItems: [ShopItem] = []
        if let groupDefaults = UserDefaults(suiteName: Constants.GroupDefaults.groupTitle) {
            if let object = groupDefaults.object(forKey: Constants.GroupDefaults.cartKey) as? Data, let encodedObjects = NSKeyedUnarchiver.unarchiveObject(with: object) as? [Data] {
                for object in encodedObjects {
                    if let unarchivedObject = NSKeyedUnarchiver.unarchiveObject(with: object) as? ShopItem {
                        cartItems.append(unarchivedObject)
                    }
                }
                return cartItems
            } else {
                return cartItems
            }
        } else {
            return cartItems
        }
    }
}

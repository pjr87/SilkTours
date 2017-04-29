//
//  MenuManager.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class MenuManager: NSObject {

    static let sharedManager = MenuManager()
    
    fileprivate override init() {}
    
    // MARK: - Public Methods
    
    func loadData() -> [MenuItem] {
        let path = Bundle.main.path(forResource: "MenuItems", ofType: "plist")
        if let dataArray = NSArray(contentsOfFile: path!) as? [[String:Any]] {
            return constructMenuItemsFromArray(dataArray)
        } else {
            return [MenuItem]()
        }
    }
    
    // MARK: - Private Methods
    
    fileprivate func constructMenuItemsFromArray(_ array: [[String:Any]]) -> [MenuItem] {
        var resultItems = [MenuItem]()
        
        for object in array {
            let loadedMenuItem = MenuItem(title: object["title"] as! String, iconTitle: object["iconTitle"] as! String)
            resultItems.append(loadedMenuItem)
        }
        return resultItems
    }
}

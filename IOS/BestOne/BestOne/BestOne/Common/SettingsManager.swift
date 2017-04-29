//
//  SettingsManager.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class SettingsManager: NSObject {

    static let sharedManager = SettingsManager()
    
    fileprivate override init() {}

    // MARK: - Public Methods
    
    func loadData() -> [SettingItem] {
        let path = Bundle.main.path(forResource: "SettingItems", ofType: "plist")
        if let dataArray = NSArray(contentsOfFile: path!) as? [[String:Any]] {
            return constructSettingItemsFromArray(dataArray)
        } else {
            return [SettingItem]()
        }
    }
    
    // MARK: - Private Methods
    
    fileprivate func constructSettingItemsFromArray(_ array: [[String:Any]]) -> [SettingItem] {
        var resultItems = [SettingItem]()
        
        for object in array {
            let loadedSettingItem = SettingItem(title: object["title"] as! String, type: SettingType(rawValue:object["type"] as! Int)!, values: object["values"] as! [AnyObject], selectedValue: object["selectedValue"] as! Int)
            resultItems.append(loadedSettingItem)
        }
        return resultItems
    }
}

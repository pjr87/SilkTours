//
//  SettingItem.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class SettingItem: NSObject {
    
    var title: String
    var type: SettingType
    var values: [AnyObject]
    var selectedValue: Int
    
    init(title: String, type: SettingType, values: [AnyObject], selectedValue: Int) {
        self.title = title
        self.type = type
        self.values = values
        self.selectedValue = selectedValue
    }
}
//
//  MenuItem.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class MenuItem: NSObject {
    
    var title: String
    var iconTitle: String
    
    init(title: String, iconTitle: String) {
        self.title = title
        self.iconTitle = iconTitle
    }
}

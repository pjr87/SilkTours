//
//  CollectionItem.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class CollectionItem: NSObject {
    
    var title: String
    var imgTitle: String
    var details: String
    var saleMode: SaleMode
    
    init(title: String, imgTitle: String, details: String, saleMode : SaleMode) {
        self.title = title
        self.imgTitle = imgTitle
        self.details = details
        self.saleMode = saleMode
    }
}

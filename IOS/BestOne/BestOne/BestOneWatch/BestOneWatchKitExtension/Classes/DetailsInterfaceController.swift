//
//  DetailsInterfaceController.swift
//  BestOne
//
//  Created by AppsFoundation on 10/15/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import WatchKit
import Foundation

class DetailsInterfaceController: WKInterfaceController {

    // MARK: - Properties
    
    @IBOutlet weak var image: WKInterfaceImage!
    
    @IBOutlet weak var titleLabel: WKInterfaceLabel!
    
    @IBOutlet weak var descriptionLabel: WKInterfaceLabel!
    
    @IBOutlet weak var priceLabel: WKInterfaceLabel!
    
    // MARK: - Interface Life Cycle
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        if let shopItem = context as? ShopItem {
            image.setImageNamed(shopItem.imgTitle)
            titleLabel.setText(shopItem.title)
            descriptionLabel.setText(shopItem.information)
            priceLabel.setText("$\(shopItem.price)")
        }
    }

    override func willActivate() {
        super.willActivate()
    }

    override func didDeactivate() {
        super.didDeactivate()
    }
}

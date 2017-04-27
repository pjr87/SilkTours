//
//  Constants.swift
//  BestOne
//
//  Created by AppsFoundation on 7/28/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

enum SaleMode: Int {
    case `default` = 0
    case featured
    case onSale
    case bestPrice
}

enum SaleModePosition : Int {
    case left = 0
    case right
}

enum SettingType : Int {
    case segment = 0
    case input
    case text
    case `switch`
    
    func toString() -> String {
        switch self {
        case .segment:
            return "Segmented"
        case .switch:
            return "Switch"
        case .input:
            return "Input"
        case .text:
            return "Text"
        }
    }
}

enum RateApp: Int {
    case declined = 0
    case confirmed
}

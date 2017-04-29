//
//  ThemeManager.swift
//  BestOne
//
//  Created by AppsFoundation on 7/29/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let NavigationTitleFontSize = 20.84
private let SegmentedControlFontSize = 8.34
private let NavigationTitleFontName = "Raleway-Medium"
private let SegmentedControlFontName = "Raleway-Regular"
private let ItemRegularFontName = "Raleway-Regular"
private let ItemBoldFontName = "Raleway-Bold"
private let ItemFontSize = 18.0

class ThemeManager: NSObject {
    
    static let sharedManager = ThemeManager()
    
    fileprivate override init() {}

    // MARK: - Apply Methods
    func applyMainTheme() {
        UINavigationBar.appearance().titleTextAttributes = [NSForegroundColorAttributeName: UIColor.white, NSFontAttributeName: UIFont(name: NavigationTitleFontName, size: CGFloat(NavigationTitleFontSize))!]
    }
    
    func applySettingThemeForNavigationBar(_ bar: UINavigationBar) {
        bar.titleTextAttributes = [NSForegroundColorAttributeName: ThemeManager.sharedManager.defaultBlueColor(), NSFontAttributeName: UIFont(name: NavigationTitleFontName, size: CGFloat(NavigationTitleFontSize))!]
    }

    // MARK: - Color Methods
    func defaultBlueColor() -> UIColor {
        return UIColor(red: 61.0/255.0, green: 97.0/255.0, blue: 153.0/255.0, alpha: 1.0)
    }
    
    func settingsCellBackgroundColor() -> UIColor {
        return UIColor(red: 250.0/255.0, green: 250.0/255.0, blue: 250.0/255.0, alpha: 1.0)
    }
    
    func itemTextColor() -> UIColor {
        return UIColor(red: 196.0/255.0, green: 207.0/255.0, blue: 224.0/255.0, alpha: 1.0)
    }
    
    // MARK: - Font Methods
    func itemTextRegularFont() -> UIFont {
        return UIFont(name: ItemRegularFontName, size: CGFloat(ItemFontSize))!
    }
    
    func itemTextBoldFont() -> UIFont {
        return UIFont(name: ItemBoldFontName, size: CGFloat(ItemFontSize))!
    }
    
    // MARK: - Button Customization Methods
    func styledWhiteBackButtonWithTarget(_ target: AnyObject, action: Selector) -> UIBarButtonItem {
        let backBtnImg = UIImage(named: "back_icon.png")?.withRenderingMode(.alwaysOriginal)
        let backBarBtn = UIBarButtonItem(image: backBtnImg, style: .plain, target: target, action: action)
        return backBarBtn
    }
    
    func styledBlueBackButtonWithTarget(_ target: AnyObject, action: Selector) -> UIBarButtonItem {
        let backBtnImg = UIImage(named: "back_blue_icon.png")?.withRenderingMode(.alwaysOriginal)
        let backBarBtn = UIBarButtonItem(image: backBtnImg, style: .plain, target: target, action: action)
        return backBarBtn
    }
    
    // MARK: - Text Attributes Methods
    func textAttributesForSegmentedControl() -> [String: AnyObject] {
        return [NSForegroundColorAttributeName: ThemeManager.sharedManager.defaultBlueColor(), NSFontAttributeName: UIFont(name: SegmentedControlFontName, size: CGFloat(SegmentedControlFontSize))!]
    }
}

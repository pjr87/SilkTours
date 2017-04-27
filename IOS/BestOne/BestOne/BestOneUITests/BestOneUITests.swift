//
//  BestOneUITests.swift
//  BestOneUITests
//
//  Created by AppsFoundation
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import XCTest

class BestOneUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        continueAfterFailure = false
        XCUIApplication().launch()
    }
    
    override func tearDown() {
        super.tearDown()
    }
    
    func testLoginScreen() {
        
        let app = XCUIApplication()
        let elementsQuery = app.scrollViews.otherElements
        elementsQuery.textFields["ENTER YOUR E-MAIL"].tap()
        elementsQuery.textFields["ENTER YOUR PASSWORD"].tap()
        app.typeText("\n")
        app.buttons["Sign In"].tap()
        
        let backIconButton = app.navigationBars["COLLECTIONS"].buttons["back icon"]
        backIconButton.tap()
        
        let logOutStaticText = app.tables.staticTexts["Log Out"]
        logOutStaticText.tap()
        app.buttons["Sign in with Facebook"].tap()
        backIconButton.tap()
        logOutStaticText.tap()
        app.buttons["Sign in with Twitter"].tap()
        backIconButton.tap()
        logOutStaticText.tap()
        app.buttons["FORGOT PASSWORD?"].tap()
        app.buttons["SIGN UP"].tap()
        
    }
    
    func testCollectionsScreen() {
        
        let app = XCUIApplication()
        app.buttons["Sign In"].tap()
        
        let cell = app.tables.children(matching: .cell).element(boundBy: 0)
        cell.staticTexts["spring collection."].tap()
        
        let whatAreYouLookingForTextField = app.textFields["WHAT ARE YOU LOOKING FOR?"]
        whatAreYouLookingForTextField.tap()
        app.typeText("\n")
        cell.buttons["show item"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        elementsQuery.buttons["Medium"].tap()
        elementsQuery.buttons["Large"].tap()
        app.buttons["additem"].tap()
        app.buttons["deletefromcart"].tap()
        app.navigationBars["Cute Racoon"].buttons["back icon"].tap()
        
        let shopNavigationBar = app.navigationBars["SHOP"]
        shopNavigationBar.otherElements.children(matching: .button).element.tap()
        app.navigationBars["CHECK OUT"].buttons["back icon"].tap()
        shopNavigationBar.buttons["back icon"].tap()
        app.navigationBars["COLLECTIONS"].otherElements.children(matching: .button).element.tap()
        
    }
    
    func testFavoritesScreen() {
        
        let app = XCUIApplication()
        app.buttons["Sign In"].tap()
        app.navigationBars["COLLECTIONS"].buttons["back icon"].tap()
        app.tables.staticTexts["Favorites"].tap()
        
    }
    
    func testCartScreen() {
        
        let app = XCUIApplication()
        app.buttons["Sign In"].tap()
        app.navigationBars["COLLECTIONS"].buttons["back icon"].tap()
        app.tables.staticTexts["My Cart"].tap()
        
    }
    
    func testSettingsScreen() {
        
        let app = XCUIApplication()
        app.buttons["Sign In"].tap()
        app.navigationBars["COLLECTIONS"].buttons["back icon"].tap()
        
        let tablesQuery = app.tables
        tablesQuery.staticTexts["Settings"].tap()
        tablesQuery.buttons["MALE"].tap()
        tablesQuery.buttons["BOTH"].tap()
        tablesQuery.staticTexts["jessy.venzel@gmail.com"].tap()
        tablesQuery.staticTexts["Terms and Conditions"].tap()
        tablesQuery.staticTexts["Payment preferences"].tap()
        tablesQuery.staticTexts["E-mail me on new collections"].tap()
        tablesQuery.switches["E-mail me on new collections"].tap()
        tablesQuery.staticTexts["Push notifications"].tap()
        tablesQuery.switches["Push notifications"].tap()
        tablesQuery.staticTexts["Contact Us"].tap()
        
    }
    
}

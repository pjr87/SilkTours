//
//  AppDelegate.swift
//  BestOne
//
//  Created by AppsFoundation on 7/27/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit
import GoogleMobileAds

let secondsInMinute = 60.0

private let GoogleAdmobUnitId = "ca-app-pub-3940256099942544/1033173712"
private let RevmobAppId = "52eb8752a026a90b34000d7f"
private let AdColonyAppId = "appdd3425524d234ba4bd"
private let AdColonyZoneId = "vz7166df2af5ed437088"
private let AdColonyVideoAd = "vz7166df2af5ed437088"

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var interstitial: GADInterstitial?
    var request: GADRequest?
    var revMobFullscreen: RevMobFullscreen?
    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Remove comments to add Flurry Analytics more information here - www.flurry.com
        // let flurrySessionId = ConfigurationManager.sharedManager.flurrySessionId
        // Flurry.startSession(flurrySessionId)
        
        initAppiRater()
        
        //init rate timer
        initRateAppTimer()
        
        ThemeManager.sharedManager.applyMainTheme()
        
        // Uncomment appropriate line to show ads.
        
        //AdMob:
        //showInterstitialAd()
        
        //AdColony:
        //configureAdColony()
        //to show ads:AdColony.playVideoAdForZone("vz7166df2af5ed437088", withDelegate: nil)
        
        //RevMob:
        //showRevMob()
        
        return true
    }
    
    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    }
    
    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }
    
    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
    
    // MARK: - Public Methods
    
    func showAppRate() {
        let didShowAppRate = UserDefaults.standard.value(forKey: "showedAppRate") as? Bool
        if didShowAppRate != true {
            rateApp()
            UserDefaults.standard.set(true, forKey: "showedAppRate")
            UserDefaults.standard.synchronize()
        }
    }
    
    // MARK: - Private Methods
    fileprivate func initAppiRater() {
        Appirater.appLaunched(true)
        Appirater.setAppId(ConfigurationManager.sharedManager.appId)
        Appirater.setOpenInAppStore(true)
    }
    
    fileprivate func initRateAppTimer() {
        let didShowAppRate = UserDefaults.standard.value(forKey: "showedAppRate") as? Bool
        if didShowAppRate != true {
            let showRateDelay = TimeInterval(Double(ConfigurationManager.sharedManager.rateAppDelay)! * secondsInMinute)
            Timer.scheduledTimer(timeInterval: showRateDelay, target: self, selector: #selector(AppDelegate.showAppRate), userInfo: nil, repeats: false)
        }
    }
    
    fileprivate func rateApp() {
        let alertController = UIAlertController(title: "Rate the App", message: "Do you like this app?", preferredStyle: UIAlertControllerStyle.alert)
        
        //Create action for "No"
        let noAction: UIAlertAction = UIAlertAction(title: "No", style: UIAlertActionStyle.cancel) { action -> Void in }
        alertController.addAction(noAction)
        
        //Create action for "Yes"
        let yesAction: UIAlertAction = UIAlertAction(title: "Yes", style: .default) { action -> Void in
            Appirater.rateApp()
        }
        alertController.addAction(yesAction)
        
        window?.rootViewController!.present(alertController, animated: true, completion: nil)
    }
    
    //MARK: - AdMob Methods
    fileprivate func showInterstitialAd() {
        request = GADRequest()
        request!.testDevices = [kGADSimulatorID]
        interstitial = GADInterstitial(adUnitID: GoogleAdmobUnitId)
        interstitial!.delegate = self
        interstitial!.load(request)
    }
    
    //MARK: - AdColony Methods
    //You can view full tutorial here
    //https://github.com/AdColony/AdColony-iOS-SDK/wiki
    
    fileprivate func configureAdColony() {
        AdColony.configure(withAppID: AdColonyAppId, zoneIDs: [AdColonyZoneId], delegate: nil, logging: true)
    }
    
    //MARK: - RevMob Methods
    //You can view full tutorial here
    //http://sdk.revmobmobileadnetwork.com/ios.html
    
    fileprivate func showRevMob() {
        RevMobAds.startSession(withAppID: RevmobAppId, withSuccessHandler: { () -> Void in
            self.revMobFullscreen = RevMobAds.session().fullscreen()
            self.revMobFullscreen!.delegate = self
            self.revMobFullscreen!.showAd()
        }, andFailHandler: { (error) in
            print("revmob failed")
        })
    }
}

// MARK: - UIAlertViewDelegate
extension AppDelegate: UIAlertViewDelegate {
    func alertView(_ alertView: UIAlertView, clickedButtonAt buttonIndex: Int) {
        if alertView.title == "Rate the App" {
            switch buttonIndex {
            case RateApp.declined.rawValue:
                break
            case RateApp.confirmed.rawValue:
                Appirater.rateApp()
                break
            default:
                break
            }
        }
    }
}

// MARK: - GADInterstitialDelegate
extension AppDelegate: GADInterstitialDelegate {
    
    func interstitialDidReceiveAd(_ ad: GADInterstitial) {
        ad.present(fromRootViewController: window?.rootViewController)
    }
    
    func interstitial(_ ad: GADInterstitial!, didFailToReceiveAdWithError error: GADRequestError!) {
        print("error: appdelegate #79")
    }
}

// MARK: - AdColonyDelegate
extension AppDelegate: AdColonyDelegate {}

// MARK: - RevMobAdsDelegate
extension AppDelegate: RevMobAdsDelegate {}


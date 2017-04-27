//
//  SettingsViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let RowHeightCoef = 0.11694
private let SettingCellIdentifier = "SettingTableViewCell"

class SettingsViewController: BaseViewController {
    
    @IBOutlet weak var settingsTableView: UITableView?
    fileprivate var settingItems: [SettingItem] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        settingItems = SettingsManager.sharedManager.loadData()
        
        //create back button
        navigationItem.leftBarButtonItem = ThemeManager.sharedManager.styledBlueBackButtonWithTarget(self, action: Selector(("didClickedBackBtn:")))
        
        //customize navigation bar
        ThemeManager.sharedManager.applySettingThemeForNavigationBar(navigationController!.navigationBar)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

// MARK: - UITableViewDataSource
extension SettingsViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return settingItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let settingItem = settingItems[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: settingItem.type.toString() + SettingCellIdentifier) as! SettingTableViewCell
        cell.setSettingItem(settingItem)
        if indexPath.row % 2 == 0 {
            cell.contentView.backgroundColor = UIColor.white
        } else {
            cell.contentView.backgroundColor = ThemeManager.sharedManager.settingsCellBackgroundColor()
        }
        return cell
    }
}

// MARK: - UITableViewDelegate
extension SettingsViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return CGFloat(RowHeightCoef) * view.frame.height
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        if indexPath.row == settingItems.count - 1 {
            SharingManager.sharedManager.inviteByMailFromViewController(self)
        }
    }
}



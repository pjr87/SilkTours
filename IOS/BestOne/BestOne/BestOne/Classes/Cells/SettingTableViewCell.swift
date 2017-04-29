//
//  SettingTableViewCell.swift
//  BestOne
//
//  Created by AppsFoundation on 7/30/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let SwitcherTransformationCoef = 0.7
private let SegmentedControlTransformationCoef = 0.7

class SettingTableViewCell: UITableViewCell {
    
    @IBOutlet weak var titleLbl: UILabel?
    @IBOutlet weak var segmentedControl: UISegmentedControl?
    @IBOutlet weak var arrowImgView: UIImageView?
    @IBOutlet weak var textLbl: UILabel?
    @IBOutlet weak var switcher: UISwitch?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        if let switcher = self.switcher {
            switcher.transform = CGAffineTransform(scaleX: CGFloat(SwitcherTransformationCoef), y: CGFloat(SwitcherTransformationCoef))
        }
        
        if let segmentedControl = self.segmentedControl {
            segmentedControl.setTitleTextAttributes(ThemeManager.sharedManager.textAttributesForSegmentedControl(), for: UIControlState())
            segmentedControl.transform = CGAffineTransform(scaleX: 1.0, y: CGFloat(SegmentedControlTransformationCoef))
        }
        updateConstraints()
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
    func setSettingItem(_ settingItem: SettingItem) {
        titleLbl?.text = settingItem.title
        
        switch settingItem.type {
        case .segment:
            segmentedControl?.removeAllSegments()
            for i in 0 ..< settingItem.values.count {
                segmentedControl?.insertSegment(withTitle: (settingItem.values[i] as! String), at: i, animated: false)
            }
            segmentedControl?.selectedSegmentIndex = settingItem.selectedValue
            break
        case .input:
            textLbl?.text = (settingItem.values.last as! String)
            break
        case .switch:
            switcher?.setOn(settingItem.selectedValue > 0, animated: true)
            break
        default:
            break
        }
    }
}

//
//  MenuTableViewCell.swift
//  BestOne
//
//  Created by AppsFoundation on 7/30/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class MenuTableViewCell: UITableViewCell {
    
    @IBOutlet weak var iconImgView: UIImageView?
    @IBOutlet weak var titleLbl: UILabel?
    @IBOutlet weak var cartCountLbl: UILabel?
    var iconImgTitle: String?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        if highlighted {
            backgroundView?.backgroundColor = ThemeManager.sharedManager.defaultBlueColor()
            titleLbl?.textColor = UIColor.white
            if let imgTitle = iconImgTitle {
                iconImgView?.image = UIImage(named:imgTitle+"Selected")
            }
        } else {
            backgroundView?.backgroundColor = UIColor.white
            titleLbl?.textColor = ThemeManager.sharedManager.defaultBlueColor()
            if let imgTitle = iconImgTitle {
                iconImgView?.image = UIImage(named: imgTitle)
            }
        }
        
    }
}

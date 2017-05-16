//
//  CollectionTableViewCell.swift
//  BestOne
//
//  Created by AppsFoundation on 7/29/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

class CollectionTableViewCell: UITableViewCell {
    
    @IBOutlet weak var backgroundImgView: UIImageView?
    @IBOutlet weak var titleLbl: UILabel?
    @IBOutlet weak var detailsLbl: UILabel?
    @IBOutlet weak var saleimgView: UIImageView?
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
    func setSaleMode(_ mode: SaleMode) {
        switch (mode) {
        case .default:
            saleimgView?.isHidden = true
            break
        case .featured:
            saleimgView?.isHidden = false
            saleimgView?.image = UIImage(named: "featured.png")
            break
        case .onSale:
            saleimgView?.isHidden = false
            saleimgView?.image = UIImage(named: "featured.png")
            break
        default:
            break
        }
    }
}

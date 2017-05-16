//
//  BaseShopTableViewCell.swift
//  BestOne
//
//  Created by AppsFoundation on 7/29/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

// MARK: - BaseShopTableViewCellDelegate
@objc protocol BaseShopTableViewCellDelegate {
    @objc optional func didFavoriteBtnClicked(_ cell: BaseShopTableViewCell)
    @objc optional func didShowItemBtnClicked(_ cell: BaseShopTableViewCell)
}

class BaseShopTableViewCell: UITableViewCell {
    
    @IBOutlet weak var priceLbl : UILabel?
    @IBOutlet weak var backgroundImgView : UIImageView?
    @IBOutlet weak var titleLbl : UILabel?
    @IBOutlet weak var subTitleLbl : UILabel?
    @IBOutlet weak var favoriteBtn : UIButton?
    @IBOutlet weak var saleModeImgView : UIImageView?
    var delegate : BaseShopTableViewCellDelegate?
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
    func setSaleMode(_ saleMode: SaleMode) {
        switch (saleMode) {
        case .default:
            saleModeImgView?.isHidden = true
            break
        case .onSale:
            saleModeImgView?.isHidden = false
            saleModeImgView?.image = UIImage(named: "featured.png")
            break
        case .featured:
            saleModeImgView?.isHidden = false
            saleModeImgView?.image = UIImage(named: "featured.png")
            break
        case .bestPrice:
            saleModeImgView?.isHidden = false
            saleModeImgView?.image = UIImage(named: "featured.png")
            break
        }
    }
    
    //Private Methods
    @IBAction fileprivate func onFavoriteBtnClicked(_ sender: AnyObject) {
        delegate?.didFavoriteBtnClicked!(self)
    }
    
    @IBAction fileprivate func onAddItemBtnClicked(_ sender: AnyObject) {
        delegate?.didShowItemBtnClicked!(self)
    }
}

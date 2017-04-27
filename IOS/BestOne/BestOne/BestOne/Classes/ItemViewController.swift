//
//  ItemViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let AddItemIntoCartStr = "Add Item"
private let DeleteItemFromCartStr = "Delete from cart"
private let PreviewCellIdentifier = "PreviewCollectionViewCell"
private let CartBtnAddCoef = 0.293333
private let CartBtnDeleteCoef = 0.47
private let CartBtnAddMinWidth = 110
private let CartBtnDeleteMinWidth = 170
private let CartBtnImgMargin = 20.0

class ItemViewController: BaseViewController {
    
    @IBOutlet weak var priceLbl: UILabel?
    @IBOutlet weak var titleLbl: UILabel?
    @IBOutlet weak var subTitleLbl: UILabel?
    @IBOutlet weak var informationLbl: UILabel?
    @IBOutlet weak var sizeSegmentedControl: UISegmentedControl?
    @IBOutlet weak var previewCollectionView: UICollectionView?
    @IBOutlet weak var pageControl: UIPageControl?
    @IBOutlet weak var favoriteBtn: UIButton?
    @IBOutlet weak var cartBtn: UIButton?
    @IBOutlet weak var segmentedControl: UISegmentedControl?
    @IBOutlet weak var cartBtnWidthConstraint: NSLayoutConstraint?
    var shopItem: ShopItem?
    fileprivate var itemsInCart: [ShopItem] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //set page control count
        pageControl?.numberOfPages = (shopItem?.previewImgs.count)!
        
        //set title for controller
        title = shopItem?.title
        
        //fill the field with information
        initShopInformation()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        let isItemInCart = CartManager.sharedManager.cartItems.contains(shopItem!)
        let widthCoef = isItemInCart ? CartBtnDeleteCoef : CartBtnAddCoef
        let minWidth = isItemInCart ? CartBtnDeleteMinWidth : CartBtnAddMinWidth
        let constraintValue = max(view.frame.width * CGFloat(widthCoef), CGFloat(minWidth))
        
        cartBtn?.imageEdgeInsets = UIEdgeInsetsMake(0, constraintValue - CGFloat(CartBtnImgMargin), 0, 0)
        cartBtnWidthConstraint?.constant = constraintValue
        cartBtn?.setAttributedTitle(attributedStrForAdding(!isItemInCart), for: UIControlState())
        
        updateViewConstraints()
        
        //normalize information label
        informationLbl?.preferredMaxLayoutWidth = informationLbl!.frame.width
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    // MARK: - Private Methods
    fileprivate func attributedStrForAdding(_ isAdding: Bool) -> NSAttributedString {
        let boldFont = ThemeManager.sharedManager.itemTextBoldFont()
        let regularFont = ThemeManager.sharedManager.itemTextRegularFont()
        let textColor = ThemeManager.sharedManager.itemTextColor()
        let boldType = [NSFontAttributeName: boldFont, NSForegroundColorAttributeName: textColor]
        let regularType = [NSFontAttributeName: regularFont, NSForegroundColorAttributeName: textColor]
        
        let attributedString = NSMutableAttributedString()
        if isAdding { //string for adding into cart
            attributedString.append(NSAttributedString(string: "add", attributes: boldType))
            attributedString.append(NSAttributedString(string: "item", attributes: regularType))
        } else {
            attributedString.append(NSAttributedString(string: "delete", attributes: boldType))
            attributedString.append(NSAttributedString(string: "from", attributes: regularType))
            attributedString.append(NSAttributedString(string: "cart", attributes: boldType))
        }
        return attributedString
    }
    
    fileprivate func initShopInformation() {
        if let shopItem = shopItem {
            priceLbl?.text = "$" + shopItem.price
            titleLbl?.text = shopItem.title
            subTitleLbl?.text = shopItem.subTitle
            informationLbl?.text = shopItem.information
            segmentedControl?.selectedSegmentIndex = 0
            
            //set favorite button
            favoriteBtn?.isSelected = FavoriteItemsManager.sharedManager.items.contains(shopItem)
        }
    }
    
    // MARK: - Actions
    @IBAction func onFavoriteBtnClicked(_ sender: AnyObject) {
        //select/deselect favorite btn for selected shop item
        if FavoriteItemsManager.sharedManager.items.contains(shopItem!) { //remove shop item from favorites
            FavoriteItemsManager.sharedManager.removeItem(shopItem!)
            favoriteBtn?.isSelected = false
        } else { //add shop item into favorites
            FavoriteItemsManager.sharedManager.addItem(shopItem!)
            favoriteBtn?.isSelected = true
        }
    }

    @IBAction func onAddItemBtnClicked(_ sender: AnyObject) {
        let isItemInCart = CartManager.sharedManager.cartItems.contains(shopItem!)
        let widthCoef = isItemInCart ? CartBtnAddCoef : CartBtnDeleteCoef
        let minWidth = isItemInCart ? CartBtnAddMinWidth : CartBtnDeleteMinWidth
        let constraintValue = max(view.frame.width * CGFloat(widthCoef), CGFloat(minWidth))
        
        cartBtn?.imageEdgeInsets = UIEdgeInsetsMake(0, constraintValue - CGFloat(CartBtnImgMargin), 0, 0)
        cartBtnWidthConstraint?.constant = constraintValue
        cartBtn?.setAttributedTitle(attributedStrForAdding(isItemInCart), for: UIControlState())

        if isItemInCart { //remove shop item from a cart
            CartManager.sharedManager.removeShopItem(shopItem!)
        } else { //add shop item into the cart
            CartManager.sharedManager.addShopItem(shopItem!)
        }
        view.updateConstraints()
    }
    
    @IBAction func didSizeControlValueChanged(_ sender: AnyObject) {
        print("User changed shop item size")
    }
    
    @IBAction func didPageControlValueChanged(_ sender: AnyObject) {}
}

// MARK: - UIScrollViewDelegate
extension ItemViewController: UIScrollViewDelegate {
    
    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        pageControl!.currentPage = Int(previewCollectionView!.contentOffset.x / previewCollectionView!.frame.width)
    }
}

// MARK: - UICollectionViewDataSource
extension ItemViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return shopItem!.previewImgs.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: PreviewCellIdentifier, for: indexPath) as! PreviewCollectionViewCell
        cell.imgView?.image = UIImage(named: shopItem!.previewImgs[indexPath.row])
        return cell
    }
}

// MARK: - UICollectionViewDelegateFlowLayout
extension ItemViewController: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return previewCollectionView!.frame.size
    }
}

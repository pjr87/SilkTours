//
//  ShopViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let RowHeightCoef = 0.3238
private let LeftShopCellIdentifier = "LeftShopTableViewCell"
private let RightShopCellIdentifier = "RightShopTableViewCell"

class ShopViewController: BaseViewController {
    
    @IBOutlet weak var searchTxtFld: UITextField?
    @IBOutlet weak var shopTableViewBottomConstraint: NSLayoutConstraint?
    @IBOutlet weak var shopTableView: UITableView?
    @IBOutlet weak var cartBarIconLbl: UILabel?
    fileprivate var shopItems: [ShopItem] = []
    fileprivate var favoriteItems: [ShopItem] = []
    fileprivate var searchedItems: [ShopItem] = []
    fileprivate var selectedShopItemIndex: Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //register xibs
        shopTableView?.register(UINib(nibName: LeftShopCellIdentifier, bundle: nil), forCellReuseIdentifier: LeftShopCellIdentifier)
        shopTableView?.register(UINib(nibName: RightShopCellIdentifier, bundle: nil), forCellReuseIdentifier: RightShopCellIdentifier)
        
        //add right image for search field
        searchTxtFld?.rightView = UIImageView(image: UIImage(named: "search_icon.png"))
        searchTxtFld?.rightViewMode = UITextFieldViewMode.unlessEditing
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        favoriteItems = FavoriteItemsManager.sharedManager.items
        shopItems = ShopManager.sharedManager.loadData()
        searchedItems = [ShopItem](shopItems)
        shopTableView!.reloadData()
        
        //set cart items count
        countShopItemsBarBtn()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Segue Methods
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showItem" {
            let itemController = segue.destination as! ItemViewController
            itemController.shopItem = shopItems[selectedShopItemIndex]
        }
    }
    
    // MARK: - Actions
    @IBAction func didCartBtnClicked(_ sender: AnyObject) {
        //go to the cart
        navigationController?.pushViewController(UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "MyCartViewController"), animated: true)
    }
    
    // MARK: - Private Methods
    fileprivate func countShopItemsBarBtn() {
        cartBarIconLbl?.text = String(CartManager.sharedManager.cartItems.count)
    }
}

// MARK: - UITableViewDataSource
extension ShopViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return searchedItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let shopItem = searchedItems[indexPath.row]
        var cell: BaseShopTableViewCell
        if shopItem.saleModePosition == .left {
            cell = tableView.dequeueReusableCell(withIdentifier: LeftShopCellIdentifier) as! LeftShopTableViewCell
        } else {
            cell = tableView.dequeueReusableCell(withIdentifier: RightShopCellIdentifier) as! RightShopTableViewCell
        }
        
        cell.titleLbl?.text = shopItem.title
        cell.subTitleLbl?.text = shopItem.subTitle
        cell.priceLbl?.text = "$" + shopItem.price
        cell.backgroundImgView?.image = UIImage(named: shopItem.imgTitle)
        cell.favoriteBtn?.isSelected = favoriteItems.contains(shopItem)
        cell.delegate = self
        return cell
    }
}

// MARK: - UITableViewDelegate
extension ShopViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return view.frame.height * CGFloat(RowHeightCoef)
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}

// MARK: - UITextFieldDelegate
extension ShopViewController: UITextFieldDelegate {
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        if let searchText: String = (textField.text as NSString?)?.replacingCharacters(in: range, with: string) {
            
            //empty search string
            if (searchText.isEmpty) || (searchText.replacingOccurrences(of: " ", with: "").characters.count == 0) {
                searchedItems = [ShopItem](shopItems)
                shopTableView?.reloadData()
                return true
            }
            
            var searchItems: [ShopItem] = []
            for shopItem in shopItems {
                if ((shopItem.title.lowercased() as NSString).range(of: searchText).location != NSNotFound) || ((shopItem.subTitle.lowercased() as NSString).range(of: searchText).location != NSNotFound) {
                    searchItems.append(shopItem)
                }
            }
            
            searchedItems = searchItems
            shopTableView?.reloadData()
        }
        
        return true
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}

// MARK: - BaseShopTableViewCellDelegate
extension ShopViewController: BaseShopTableViewCellDelegate {
    
    func didFavoriteBtnClicked(_ cell: BaseShopTableViewCell) {
        let indexPath = shopTableView!.indexPath(for: cell)!
        
        //select/deselect favorite btn for selected shop item
        if favoriteItems.contains(shopItems[indexPath.row]) { //remove shop item from favorites
            FavoriteItemsManager.sharedManager.removeItem(shopItems[indexPath.row])
        } else { //add shop item into favorites
            FavoriteItemsManager.sharedManager.addItem(shopItems[indexPath.row])
        }

        //refresh favorite list
        favoriteItems = FavoriteItemsManager.sharedManager.items
        
        //reload current row
        shopTableView?.reloadRows(at: [indexPath], with: UITableViewRowAnimation.none)
    }
    
    func didShowItemBtnClicked(_ cell: BaseShopTableViewCell) {
        let indexPath = shopTableView!.indexPath(for: cell)!
        
        //go to shop item
        selectedShopItemIndex = indexPath.row
        performSegue(withIdentifier: "showItem", sender: self)
    }
}

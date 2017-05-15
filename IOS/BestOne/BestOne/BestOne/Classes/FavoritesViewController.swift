//
//  FavoritesViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let RowHeightCoef = 0.3238
private let LeftShopCellIdentifier = "LeftShopTableViewCell"
private let RightShopCellIdentifier = "RightShopTableViewCell"

class FavoritesViewController: BaseViewController {

    @IBOutlet weak var favoritesTableView: UITableView?
    @IBOutlet weak var cartBarIconLbl: UILabel?
    fileprivate var favoritesItems: [ShopItem] = []
    fileprivate var selectedShopItemIndex: Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()

        //register xibs
        favoritesTableView?.register(UINib(nibName: LeftShopCellIdentifier, bundle: nil), forCellReuseIdentifier: LeftShopCellIdentifier)
        favoritesTableView?.register(UINib(nibName: RightShopCellIdentifier, bundle: nil), forCellReuseIdentifier: RightShopCellIdentifier)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        favoritesItems = FavoriteItemsManager.sharedManager.items
        
        //set cart items count
        countShopItemsBarBtn()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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
    
    // MARK: - Segue Methods
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showItem" {
            let itemController = segue.destination as! ItemViewController
            itemController.shopItem = favoritesItems[selectedShopItemIndex]
        }
    }
}

extension FavoritesViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return favoritesItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell: BaseShopTableViewCell
        let shopItem = favoritesItems[indexPath.row]
        if shopItem.saleModePosition == .left {
            cell = tableView.dequeueReusableCell(withIdentifier: LeftShopCellIdentifier) as! LeftShopTableViewCell
        } else {
            cell = tableView.dequeueReusableCell(withIdentifier: RightShopCellIdentifier) as! RightShopTableViewCell
        }
        
        cell.titleLbl?.text = shopItem.title
        cell.subTitleLbl?.text = shopItem.subTitle
        cell.priceLbl?.text = "$" + shopItem.price
        cell.backgroundImgView?.image = UIImage(named: shopItem.imgTitle)
        cell.favoriteBtn?.isSelected = favoritesItems.contains(shopItem)
        cell.delegate = self
        return cell
    }
}

extension FavoritesViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return view.frame.height * CGFloat(RowHeightCoef)
    }
}

extension FavoritesViewController: BaseShopTableViewCellDelegate {

    func didFavoriteBtnClicked(_ cell: BaseShopTableViewCell) {
        let indexPath = favoritesTableView!.indexPath(for: cell)!
        
        //remove favorite item from the list and table view
        FavoriteItemsManager.sharedManager.removeItem(favoritesItems[indexPath.row])
        favoritesItems = FavoriteItemsManager.sharedManager.items
        favoritesTableView?.deleteRows(at: [indexPath], with: UITableViewRowAnimation.fade)
    }

    func didShowItemBtnClicked(_ cell: BaseShopTableViewCell) {
        let indexPath = favoritesTableView!.indexPath(for: cell)!
        
        //go to shop item
        selectedShopItemIndex = indexPath.row
        performSegue(withIdentifier: "showItem", sender: self)
    }
}




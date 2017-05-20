//
//  FavoritesViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit
import SwiftyJSON

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
        
        BackendAPI.getFavs(completion: {(tours:[JSON]) -> Void in
            var i = 0
            for tour in tours {
                self.favoritesItems.append(ShopItem(id: tour["id_tour"].int!, title: tour["name"].string!, imgTitle: "image", subTitle: "sub", price: "\(tour["price"].int!)", information: tour["description"].string!, previewImgs: [tour["profile_image"].string!], saleModePosition: SaleModePosition(rawValue: i%2)!))
                i+=1
            }
            self.favoritesTableView?.reloadData()
        })
        
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
        cell.tour_id = shopItem.id
        cell.titleLbl?.text = shopItem.title
        cell.subTitleLbl?.text = shopItem.information
        cell.priceLbl?.text = "$" + shopItem.price
        if shopItem.previewImgs.count > 0 {
            //cell.backgroundImgView?.downloadedFrom(link: shopItem.previewImgs[0])
            let url = NSURL(string:shopItem.previewImgs[0])
            let data = NSData(contentsOf:url! as URL)
            cell.backgroundImgView?.contentMode = UIViewContentMode.scaleAspectFill
            cell.backgroundImgView?.image = UIImage(data: data! as Data)
        }
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

extension UIImageView {
    func downloadedFrom(url: URL, contentMode mode: UIViewContentMode = .scaleAspectFill) {
        contentMode = mode
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard
                let httpURLResponse = response as? HTTPURLResponse, httpURLResponse.statusCode == 200,
                //let mimeType = response?.mimeType, mimeType.hasPrefix("image"),
                let data = data, error == nil,
                let image = UIImage(data: data)
                else { return }
            DispatchQueue.main.async() { () -> Void in
                self.image = image
            }
            }.resume()
    }
    func downloadedFrom(link: String, contentMode mode: UIViewContentMode = .scaleAspectFill) {
        guard let url = URL(string: link) else { return }
        downloadedFrom(url: url, contentMode: mode)
    }
}




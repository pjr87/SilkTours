//
//  CollectionsViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let RowHeightCoef = 0.25787
private let CellIdentifier = "CollectionTableViewCell"

class CollectionsViewController: BaseViewController {
    
    @IBOutlet weak var collectionsTableView: UITableView?
    @IBOutlet weak var cartBarIconLbl: UILabel?
    fileprivate var collections: [CollectionItem] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        //load collection items
        collections = CollectionsManager.sharedManager.loadData()
        collectionsTableView?.reloadData()
        
        //set cart items count
        cartBarIconLbl?.text = String(CartManager.sharedManager.cartItems.count)
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
}

// MARK: - UITableViewDataSource
extension CollectionsViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return collections.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifier) as! CollectionTableViewCell
        let collectionItem = collections[indexPath.row]
        cell.titleLbl?.text = collectionItem.title
        cell.detailsLbl?.text = collectionItem.details
        cell.backgroundImgView?.image = UIImage(named: collectionItem.imgTitle)
        cell.setSaleMode(collectionItem.saleMode)
        return cell
    }
}

// MARK: - UITableViewDelegate
extension CollectionsViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return view.frame.height * CGFloat(RowHeightCoef)
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        performSegue(withIdentifier: "showShopItems", sender: self)
    }
}



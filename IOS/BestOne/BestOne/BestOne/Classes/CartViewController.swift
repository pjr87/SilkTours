//
//  CartViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/30/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit

private let DefaultItemsInSection = 2
private let CollectionCellHeightCoef = 0.1589
private let SimilarRowHeightCoef = 0.25787
private let CollectionCellHorizontalSpacing = 5.0
private let CollectionCellVerticalSpacing = 6.0
private let CollectionCellTopSpacing = 4.0
private let CollectionCellIdentifier = "CollectionTableViewCell"
private let CartCellIdentifier = "CartCollectionViewCell"

class CartViewController: BaseViewController {
    
    fileprivate var cartItems: [ShopItem] = []
    fileprivate var similarItems: [CollectionItem] = []
    
    @IBOutlet weak var cartCollectionView: UICollectionView?
    @IBOutlet weak var similarViewTable: UITableView?
    @IBOutlet weak var totalAmountLbl: UILabel?
    @IBOutlet weak var collectionViewHeightConstraint: NSLayoutConstraint?
    @IBOutlet weak var similarViewHeightConstraint: NSLayoutConstraint?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        cartItems = CartManager.sharedManager.cartItems
        similarItems = CollectionsManager.sharedManager.loadData()
        
        //count the total amount
        countTotalAmount()
        
        //update collection view height
        if let collectionViewHeightConstraint = self.collectionViewHeightConstraint {
            if cartItems.count > 0 {
                collectionViewHeightConstraint.constant = CGFloat(numberOfSections(in: cartCollectionView!)) * (CGFloat(CollectionCellHeightCoef) * view.frame.height) + CGFloat(CollectionCellTopSpacing) + CGFloat(numberOfSections(in: cartCollectionView!)) * CGFloat(CollectionCellVerticalSpacing)
            }
            else {
                collectionViewHeightConstraint.constant = 0.0
            }
        }
        
        if let similarViewHeightConstraint = self.similarViewHeightConstraint {
            similarViewHeightConstraint.constant = CGFloat(similarItems.count) * (CGFloat(SimilarRowHeightCoef) * view.frame.height)
        }
        updateViewConstraints()
        
        //refresh collection view layout
        cartCollectionView?.collectionViewLayout.invalidateLayout()
        
        //add double tap recognizer
        let doubleTapGesture = UITapGestureRecognizer(target: self, action: #selector(CartViewController.processDoubleTap(_:)))
        doubleTapGesture.numberOfTapsRequired = 2
        doubleTapGesture.numberOfTouchesRequired = 1
        doubleTapGesture.delaysTouchesBegan = true
        view.addGestureRecognizer(doubleTapGesture)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Public Methods
    func processDoubleTap(_ sender: UITapGestureRecognizer) {
        if sender.state == UIGestureRecognizerState.ended {
            let point = sender.location(in: self.cartCollectionView)
            if let indexPath = cartCollectionView?.indexPathForItem(at: point) { //concrete cell
                //count shop item index
                let cartItemIndex = indexPath.section * DefaultItemsInSection + indexPath.row
                //remove selected shop item from the cart
                CartManager.sharedManager.removeShopItem(cartItems[cartItemIndex])
                cartItems = CartManager.sharedManager.cartItems
                
                //update collection view height
                if let collectionViewHeightConstraint = collectionViewHeightConstraint {
                    if(cartItems.count > 0) {
                        collectionViewHeightConstraint.constant = CGFloat(numberOfSections(in: cartCollectionView!)) * (CGFloat(CollectionCellHeightCoef) * view.frame.height) + CGFloat(CollectionCellTopSpacing) + CGFloat(numberOfSections(in: cartCollectionView!)) * CGFloat(CollectionCellVerticalSpacing)
                    } else {
                        collectionViewHeightConstraint.constant = 0.0
                    }
                }
                
                updateViewConstraints()
                
                //refresh collection view layout
                cartCollectionView?.collectionViewLayout.invalidateLayout()
                cartCollectionView?.reloadData()
                
                //recount total amount
                countTotalAmount()
            }
        }
    }
    
    // MARK: - Actions
    @IBAction func onPurchaseBtnClicked(_ sedner: AnyObject) {
        print("Button \"Confirm Purchase?\" was clicked")
    }
    
    // MARK: - Private Methods
    fileprivate func countTotalAmount() {
        var totalAmount = 0.0
        for shopItem in cartItems {
            totalAmount += Double(shopItem.price)!
        }
        
        totalAmountLbl?.text = "Your Total: $" + String(format: "%.2f", totalAmount)
    }
}

// MARK - UICollectionViewDataSource
extension CartViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if DefaultItemsInSection * (section + 1) <= cartItems.count {
            return DefaultItemsInSection
        } else {
            return cartItems.count > 0 ? 1 : 0
        }
    }
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return Int(ceil(Double(cartItems.count) / Double(DefaultItemsInSection)))
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CartCellIdentifier, for: indexPath) as! CartCollectionViewCell
        let shopItem = cartItems[indexPath.section * DefaultItemsInSection + indexPath.row]
        cell.titleLbl?.text = shopItem.title
        cell.backgroundImgView?.image = UIImage(named: shopItem.imgTitle)
        cell.priceLbl?.text = "$" + shopItem.price
        return cell
    }
}

// MARK - UICollectionViewDelegateFlowLayout
extension CartViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: view.frame.width / CGFloat(DefaultItemsInSection) - CGFloat(CollectionCellHorizontalSpacing), height: view.frame.height * CGFloat(CollectionCellHeightCoef))
    }
}

// MARK - UITableViewDataSource
extension CartViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return similarItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CollectionCellIdentifier) as! CollectionTableViewCell
        let collectionItem = similarItems[indexPath.row]
        cell.titleLbl?.text = collectionItem.title
        cell.detailsLbl?.text = collectionItem.details
        cell.backgroundImgView?.image = UIImage(named: collectionItem.imgTitle)
        cell.setSaleMode(collectionItem.saleMode)
        
        return cell
    }
}

// MARK - UITableViewDelegate
extension CartViewController: UIScrollViewDelegate, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return view.frame.height * CGFloat(SimilarRowHeightCoef)
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        performSegue(withIdentifier: "showShopItems", sender: self)
    }
}

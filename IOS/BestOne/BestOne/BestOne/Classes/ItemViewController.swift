//
//  ItemViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//

import UIKit
import MapKit
import GoogleMaps
import GooglePlaces

private let PreviewCellIdentifier = "PreviewCollectionViewCell"

class ItemViewController: BaseViewController {
    
    @IBOutlet weak var priceLbl: UILabel?
    @IBOutlet weak var titleLbl: UILabel?
    @IBOutlet weak var subTitleLbl: UILabel?
    @IBOutlet weak var informationLbl: UILabel?
    @IBOutlet weak var photoLabel: UILabel!
    @IBOutlet weak var sizeSegmentedControl: UISegmentedControl?
    @IBOutlet weak var previewCollectionView: UICollectionView?
    @IBOutlet weak var pageControl: UIPageControl?
    @IBOutlet weak var segmentedControl: UISegmentedControl?
    var shopItem: ShopItem?
    
    @IBOutlet weak var photoScrollView: UIScrollView!
    
    var mapView: GMSMapView!
    @IBOutlet weak var googleMapsHeightConstraint: NSLayoutConstraint!
    fileprivate var itemsInCart: [ShopItem] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        pageControl?.numberOfPages = (shopItem?.previewImgs.count)!
        title = shopItem?.title
        loadGoogleMap()
        loadImageSession()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        updateViewConstraints()
        
        //normalize information label
        informationLbl?.preferredMaxLayoutWidth = informationLbl!.frame.width
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    fileprivate func loadGoogleMap() {
        let camera = GMSCameraPosition.camera(withLatitude: -33.868,
                                              longitude: 151.2086,
                                              zoom: 14)
        let mapView = GMSMapView.map(withFrame: CGRect(x: 0, y: 385, width: self.view.frame.width, height: 175), camera: camera)
        
        let marker = GMSMarker()
        marker.position = camera.target
        marker.snippet = "Hello World"
        marker.map = mapView
        
        self.view.addSubview(mapView)
    }
    
    fileprivate func loadInformation() {
        
    }

    
    fileprivate func loadImageSession() {
        var xPosition:CGFloat = 0
        let imageWidth:CGFloat = 80
        let imageHeight:CGFloat = 80
        photoScrollView.isScrollEnabled = true
        photoScrollView.frame.size.height = imageHeight + 10
        photoScrollView.frame.size.width = 450
        photoScrollView.contentSize.height = imageHeight + 10
        photoScrollView.contentSize.width = 500
        for _ in 1...10 {
            let tourImageView:UIImageView = UIImageView()
            tourImageView.backgroundColor = UIColor.blue
            
            tourImageView.frame.size.width = imageWidth
            tourImageView.frame.size.height = photoScrollView.frame.height - 5
            tourImageView.frame.origin.x = xPosition
            tourImageView.frame.origin.y = 10
            
            photoScrollView.addSubview(tourImageView)
            
            xPosition += imageWidth + 5
            
        }
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

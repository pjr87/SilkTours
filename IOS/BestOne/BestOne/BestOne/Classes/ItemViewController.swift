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
    
    var mapView: GMSMapView!
    @IBOutlet weak var googleMapsHeightConstraint: NSLayoutConstraint!
    fileprivate var itemsInCart: [ShopItem] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        pageControl?.numberOfPages = (shopItem?.previewImgs.count)!
        title = shopItem?.title
        loadGoogleMap()
        loadImageSession()
        loadButtons()
        print()
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
    
    fileprivate func loadButtons() {
        let messageButton:UIButton = UIButton()
        let joinButton:UIButton = UIButton()
        
        messageButton.setTitle("Message", for: .normal)
        messageButton.backgroundColor = UIColor.blue
        messageButton.frame.size = CGSize(width: 125, height: 30)
        messageButton.frame.origin = CGPoint(x: 35, y: 345)
        joinButton.setTitle("Join", for: .normal)
        joinButton.backgroundColor = UIColor.green
        joinButton.frame.size = CGSize(width: 125, height: 30)
        joinButton.frame.origin = CGPoint(x: 254, y: 345)
        
        self.view.addSubview(messageButton)
        self.view.addSubview(joinButton)
    }
    
    fileprivate func loadGoogleMap() {
        let camera = GMSCameraPosition.camera(withLatitude: -33.868, longitude: 151.2086, zoom: 14)
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
        let photoScrollView:UIScrollView = UIScrollView()
        let photoLabel:UILabel = UILabel()
        var xPosition:CGFloat = 10
        let imageWidth:CGFloat = 80
        let imageHeight:CGFloat = 80
        let count:Int = 10
        
        photoLabel.text = "Photo"
        photoLabel.frame.size = CGSize(width: 100, height: 30)
        photoLabel.frame.origin = CGPoint(x: 10, y: 570)
        photoScrollView.isScrollEnabled = true
        photoScrollView.frame.size = CGSize(width: self.view.frame.width, height: imageHeight + 10)
        photoScrollView.contentSize = CGSize(width: (imageWidth + 5) * CGFloat(count) + 10, height: imageHeight + 10)
        photoScrollView.frame.origin = CGPoint(x: 0, y: 600)
        
        self.view.addSubview(photoLabel)
        self.view.addSubview(photoScrollView)
        for _ in 1...count {
            let media:Media = Media()
            let tourImageView:UIImageView = UIImageView()
            //tourImageView.backgroundColor = UIColor.blue
            media.setImageByUrl(url: "https://s3.amazonaws.com/silktours-media/tour/1/0ff6044bfbf0457c9b521c986369b17f.jpg") { image in
                tourImageView.image = image
            }
            
            tourImageView.frame.size = CGSize(width: imageWidth, height: imageHeight)
            tourImageView.frame.origin = CGPoint(x: xPosition, y: 10)
            
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

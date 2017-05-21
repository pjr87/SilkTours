//
//  ItemViewController.swift
//  BestOne
//
//  Created by AppsFoundation on 7/31/15.
//  Copyright © 2015 AppsFoundation. All rights reserved.
//
//# TODO: Redo this page when have a solution on story board!!!!!!!!!!!!!!!!!!!!

import UIKit
import MapKit
import GoogleMaps
import GooglePlaces

private let PreviewCellIdentifier = "PreviewCollectionViewCell"

class ItemViewController: BaseViewController {
    var ViewWidth:CGFloat = CGFloat()

    @IBOutlet weak var previewCollectionView: UICollectionView?
    @IBOutlet weak var pageControl: UIPageControl?
    @IBOutlet weak var segmentedControl: UISegmentedControl?
    var mainScrollView: UIScrollView = UIScrollView()
    var shopItem: ShopItem?
    var buttonsView:UIView = UIView()
    var informationView:UIView = UIView()
    var gMapView:UIView = UIView()
    var imageSessionView:UIView = UIView()
    
    var mapView: GMSMapView!
    @IBOutlet weak var googleMapsHeightConstraint: NSLayoutConstraint!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = shopItem?.title
        navigationItem.titleView?.backgroundColor = UIColor.black
        
        ViewWidth = self.view.frame.width
        mainScrollView.frame.size = CGSize(width: ViewWidth, height: self.view.frame.height)
        mainScrollView.frame.origin = CGPoint(x: 0, y: 0)
        mainScrollView.isScrollEnabled = true
        mainScrollView.backgroundColor = UIColor.white
        loadInformation()
        loadButtons()
        loadGoogleMap()
        loadImageSession()
        mainScrollView.contentSize = CGSize(width: ViewWidth, height: imageSessionView.frame.maxY)
        self.view.addSubview(mainScrollView)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        updateViewConstraints()
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    
    fileprivate func loadInformation() {
        informationView.frame.size = CGSize(width: ViewWidth, height: ViewWidth * CGFloat(1))
        informationView.frame.origin = CGPoint(x: 0, y: 0)
        
        let profileImageView:UIImageView = UIImageView()
        profileImageView.frame.size = CGSize(width: ViewWidth, height: ViewWidth * CGFloat(0.625))
        profileImageView.frame.origin = CGPoint(x: 0, y: 0)
        let media:Media = Media()
        media.setImageByUrl(url: (shopItem?.previewImgs[0])!) { image in
            profileImageView.image = image
            print("profile image")
            print(image)
        }
        
        let priceLabel:UILabel = UILabel()
        priceLabel.frame.size = CGSize(width: ViewWidth * CGFloat(0.33), height: ViewWidth * CGFloat(0.125))
        priceLabel.frame.origin = CGPoint(x: 10, y: profileImageView.frame.maxY)
        priceLabel.text = "$" + (shopItem?.price)!
        let descriptionLabel:UILabel = UILabel()
        descriptionLabel.frame.size = CGSize(width: ViewWidth, height: ViewWidth * CGFloat(0.25))
        descriptionLabel.frame.origin = CGPoint(x: 10, y: priceLabel.frame.maxY)
        descriptionLabel.text = (shopItem?.information)!
        descriptionLabel.numberOfLines = 0
        
        informationView.addSubview(profileImageView)
        informationView.addSubview(priceLabel)
        informationView.addSubview(descriptionLabel)
        mainScrollView.addSubview(informationView)
    }
    
    fileprivate func loadButtons() {
        
        buttonsView.frame.size = CGSize(width: ViewWidth, height: ViewWidth * CGFloat(0.1))
        buttonsView.frame.origin = CGPoint(x: 0, y: informationView.frame.maxY)
        
        let messageButton:UIButton = UIButton()
        let joinButton:UIButton = UIButton()
        
        messageButton.setTitle("Message", for: .normal)
        messageButton.backgroundColor = UIColor.blue
        messageButton.frame.size = CGSize(width: ViewWidth * CGFloat(0.333), height: ViewWidth * CGFloat(0.09))
        messageButton.frame.origin = CGPoint(x: buttonsView.frame.width * CGFloat(0.083), y: 0)
        joinButton.setTitle("Join", for: .normal)
        joinButton.backgroundColor = UIColor.green
        joinButton.frame.size = CGSize(width: ViewWidth * CGFloat(0.333), height: ViewWidth * CGFloat(0.09))
        joinButton.frame.origin = CGPoint(x: ViewWidth * CGFloat(0.583), y: 0)
        
        buttonsView.addSubview(messageButton)
        buttonsView.addSubview(joinButton)
        mainScrollView.addSubview(buttonsView)
    }
    
    fileprivate func loadGoogleMap() {
        gMapView.frame.size = CGSize(width: ViewWidth, height: 175)
        gMapView.frame.origin = CGPoint(x: 0, y: buttonsView.frame.maxY + CGFloat(10))
        let camera = GMSCameraPosition.camera(withLatitude: -33.868, longitude: 151.2086, zoom: 14)
        let mapView = GMSMapView.map(withFrame: CGRect(x: 0, y: 0, width: ViewWidth, height: 175), camera: camera)
        
        let marker = GMSMarker()
        marker.position = camera.target
        marker.snippet = "Hello World"
        marker.map = mapView
        
        gMapView.addSubview(mapView)
        mainScrollView.addSubview(gMapView)
    }
    
    
    fileprivate func loadImageSession() {
        let photoScrollView:UIScrollView = UIScrollView()
        let photoLabel:UILabel = UILabel()
        var xPosition:CGFloat = 10
        let imageWidth:CGFloat = 80
        let imageHeight:CGFloat = 80
        let labelHeight:CGFloat = 30
        let count:Int = 10
        
        imageSessionView.frame.size = CGSize(width: ViewWidth, height: labelHeight + imageHeight + 20)
        imageSessionView.frame.origin = CGPoint(x: 0, y: gMapView.frame.maxY)
        photoLabel.text = "Photo"
        photoLabel.frame.size = CGSize(width: ViewWidth, height: labelHeight)
        photoLabel.frame.origin = CGPoint(x: 10, y: 0)
        photoScrollView.isScrollEnabled = true
        photoScrollView.frame.size = CGSize(width: ViewWidth, height: imageHeight + 10)
        photoScrollView.contentSize = CGSize(width: (imageWidth + 5) * CGFloat(count) + 10, height: imageHeight + 10)
        photoScrollView.frame.origin = CGPoint(x: 0, y: labelHeight)
        
        imageSessionView.addSubview(photoLabel)
        imageSessionView.addSubview(photoScrollView)
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
        mainScrollView.addSubview(imageSessionView)
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

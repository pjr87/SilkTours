//
//  Media.swift
//  BestOne
//
//  Created by Yongqiang Fan on 5/16/17.
//  Copyright © 2017 AppsFoundation. All rights reserved.
//

import Foundation

class Media {
    var image:UIImage = UIImage()
    
    init() {
        
    }
    
    func getImage() -> UIImage {
        return self.image
    }
    
    func setImageByUrl(url:String, completion:@escaping (UIImage) -> ()) {
        let mediaUrl = URL(string: url)!
        
        let session = URLSession(configuration: .default)
        let downloadImageTask = session.dataTask(with: mediaUrl) { (data, response, error) in
            if let e = error {
                print("Error downloading picture: \(e)")
            } else {
                if let res = response as? HTTPURLResponse {
                    print("Downloaded picture with response code \(res.statusCode)")
                    if let imageData = data {
                        //print(imageData)
                        //self.image = UIImage(data: imageData)!
                        completion((UIImage(data: imageData))!)
                    } else {
                        print("Couldn't get image: Image is nil")
                    }
                } else {
                    print("Couldn't get response code for some reason")
                }
            }
        }
        downloadImageTask.resume()
    }
    
}

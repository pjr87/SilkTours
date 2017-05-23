//
//  Media.swift
//  BestOne
//
//  Created by Yongqiang Fan on 5/16/17.
//  Copyright © 2017 AppsFoundation. All rights reserved.
//
//# TODO: Make this object when have time!

import Foundation

class Media {
    var image:UIImage
    var display_rank:Int
    var file_name:String
    var url:String
    
    init(display_rank: Int, file_name: String, url: String) {
        self.display_rank = display_rank
        self.file_name = file_name
        self.url = url
        self.image = UIImage()
        BackendAPI.getImageByUrl(url: url) { image in
            self.image = image
        }
    }
    
    func getImage() -> UIImage {
        return self.image
    }
    
    /*
    func getImagesWithId(tourId:String) -> [String] {
        
    }*/
    
    func setImage() {
        
    }
    
    
}

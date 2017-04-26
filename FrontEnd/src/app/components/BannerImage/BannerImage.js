import React from 'react';

import downloadApp from '../../style/images/downloadApp.png';
import landscape from '../../style/images/landscape.png';
import genericCity from '../../style/images/genericCity.png';
import BWcity from '../../style/images/BWcity.png';
import landingImageToronto from '../../style/images/landingImageToronto.jpg';
import landingImageStLouis from '../../style/images/landingImageStLouis.jpg';
import Carousel from 'react-bootstrap/lib/Carousel';
import Image from 'react-bootstrap/lib/Image';

import Style from './style.css'

class BannerImage extends React.Component {
  render(){
    return(
      <div>
        <Carousel>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={landingImageToronto}/>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={landingImageStLouis}/>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={downloadApp}/>
            <Carousel.Caption>
              <p className={Style.bannerCaptionDownload}>Download</p>
              <p className={Style.bannerCaptionDownload2}>the app</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={landscape}/>
            <Carousel.Caption>
              <p className={Style.bannerCaptionExplore}>Explore new experiences</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={genericCity}/>
            <Carousel.Caption>
              <p className={Style.bannerCaptionSignup}>Sign up now!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={BWcity}/>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default BannerImage;

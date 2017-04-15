import React from 'react';

import logoImg1 from '../../style/images/logo1.png';
import logoImg2 from '../../style/images/logo2.png';
import logoImg3 from '../../style/images/logo3.png';
import logoImg4 from '../../style/images/logo4.png';
import logoImg5 from '../../style/images/logo5.png';

import Carousel from 'react-bootstrap/lib/Carousel';
import Image from 'react-bootstrap/lib/Image';

import Style from './style.css'

class BannerImage extends React.Component {
  render(){
    return(
      <div>
        <Carousel>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={logoImg1}/>
            <Carousel.Caption>
              <p className={Style.bannerCaptionDownload}>Download</p>
              <p className={Style.bannerCaptionDownload2}>the app</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={logoImg2}/>
            <Carousel.Caption>
              <p className={Style.bannerCaptionExplore}>Explore new experiences</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={logoImg3}/>
            <Carousel.Caption>
              <p className={Style.bannerCaptionSignup}>Sign up now!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={logoImg5}/>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default BannerImage;

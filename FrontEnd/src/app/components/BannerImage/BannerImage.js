import React from 'react';

import { browserHistory } from 'react-router';

import downloadApp from '../../style/images/downloadApp.png';
import landscape from '../../style/images/landscape.png';
import genericCity from '../../style/images/genericCity.png';
import BWcity from '../../style/images/BWcity.png';
import landingImageToronto from '../../style/images/landingImageToronto.jpg';
import landingImageStLouis from '../../style/images/landingImageStLouis.jpg';
import landingImageHeroimage from '../../style/images/landingImageHeroimage.jpg';
import landingImageSilktours from '../../style/images/landingImageSilktours.png';

import {Col, Row, Grid, Button, Carousel, Image} from 'react-bootstrap';

import Style from './style.css'

class BannerImage extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (){
    browserHistory.push('/signup');
  }

  render(){
    return(
      <div>
        <Carousel>
          <Carousel.Item>
            <Image className="img-responsive center-block" src={landingImageHeroimage}/>
            <Carousel.Caption>
              <Grid className={Style.bannerGrid}>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <Image className={Style.bannerImage} src={landingImageSilktours}/>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <p className={Style.bannerCaption}>Book incredible tours and get to know a new destination</p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <p className={Style.bannerCaptionNextLine}>with local tour guides.</p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Button className={Style.bannerButton} bsStyle="info" onClick={this.handleClick}>Begin your Adventure ></Button>
                  </Col>
                </Row>
              </Grid>
            </Carousel.Caption>
          </Carousel.Item>
          {/*
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
          */}
        </Carousel>
      </div>
    );
  }
}

export default BannerImage;

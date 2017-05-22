
import React from 'react';
import {BannerImage} from 'components';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Style from './style.css'
import Image from 'react-bootstrap/lib/Image';
import {
  LandingCanvas,
  ThemePropagator,
  GenericBrick,
  DoubleContentBrick,
  StrongMessageBrick,
  EnumerationBrick,
  EmailSqueezeBrick,
  FooterBrick,
  CallToAction,
  FeatureItem,
  PlaceHolder
} from 'landricks-components';

import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import baiada from '../../style/images/baiada.jpg';
import drexel from '../../style/images/drexel.png';
import landscape from '../../style/images/landscape.png';
import genericCity from '../../style/images/genericCity.png';
import BWcity from '../../style/images/BWcity.png';
import CitySkylineDock from '../../style/images/CitySkylineDock.jpg';
import philadelphiaCityView from '../../style/images/philadelphiaCityView.jpg';
import iphone from '../../style/images/iphone.png';
import building from '../../style/images/building.jpg';
import forrest from '../../style/images/forrest.jpg';
import landingImageHeroimage from '../../style/images/landingImageHeroimage.jpg';
import landingImageSilktours from '../../style/images/landingImageSilktours.png';
import cognitoFunctions from '../../utils/cognitoFunctions';

class LandingPage extends React.Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickExplore = this.handleClickExplore.bind(this);
  }

  handleClick (){
    let loggedIn = cognitoFunctions.loggedIn();

    if(loggedIn){
      browserHistory.push('/explore');
    }
    else{
      browserHistory.push('/signup');
    }
  }

  handleClickExplore (){
    browserHistory.push('/explore');
  }

  render(){
    const BASE_THEME = {
      fontFamily: 'Lato',
      baseFontSize: '18px'
    }

    const HEADER_BAND_THEME = {
      ...BASE_THEME,
      baseFontSize: '18px',
      backgroundColor: '#AB619E',
      textColor: '#FFFFFF',
      primaryColor: '#FFFFFF',
      primaryContrastColor: '#AB619E',
      objectDesign: 'square-solid'
    }

    const HEAVY_BAND_THEME = {
      ...BASE_THEME,
      backgroundColor: '#AB619E',
      textColor: '#FFFFFF',
      primaryColor: '#FFFFFF',
      primaryContrastColor: '#AB619E',
      secondaryColor: '#FFFFFF',
      objectDesign: 'square-outline'
    }

    const LIGHT_BAND_THEME = {
      ...BASE_THEME,
      backgroundColor: '#AB619E',
      textColor: '#FFFFFF',
      primaryColor: '#FFFFFF',
      secondaryColor: '#AB619E'
    }

    const FIRST_BAND_THEME = {
      ...BASE_THEME,
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      primaryColor: '#FFFFFF',
      secondaryColor: '#AB619E'
    }

    return (
      <div>
        {/*
        <BannerImage/>
        */}

        <LandingCanvas>

          <GenericBrick
            backgroundImage={landingImageHeroimage}>
            <br/>
            <br/>
            <Image src={landingImageSilktours}/>
            <br/>
            <br/>
            <p className={Style.landingContent}>Book incredible tours and get to know a new destination</p>
            <p className={Style.landingContent}>with local tour guides.</p>
            <br/>
            <br/>
            <br/>
            <Button className={Style.bannerButton} bsStyle="info" onClick={this.handleClick}>Begin your Adventure ></Button>
            <br/>
            <br/>
            <br/>
          </GenericBrick>

          {/*
          <StrongMessageBrick
            theme={ HEADER_BAND_THEME }
            messageLevel1="Welcome to Silk Tours!"
            CTAs={ <CallToAction label="Sign Up Now!" onClick={this.handleClick}/> }
          />
          */}

          <div className = {Style.pane}>
            <div className= {Style.sideLeft}>
              <Image className="img-responsive" src={iphone}/>
            </div>
            <div className = {Style.sideRight}>
              <p className={Style.landingHeader}>So you're going on a trip.</p>
              <p className={Style.landingHeader}>Where do you begin&#63;</p>
              <br/>
              <p className={Style.landingSubHeader}>Meet Someone New</p>
              <p className={Style.landingContent}>Aenean sollicitudin, erat a elementum rutrum, neque sem</p>
              <p className={Style.landingContent}>pretium metus, quis mollis nisl nunc et massa.</p>
              <br/>
              <p className={Style.landingSubHeader}>Find places Easily</p>
              <p className={Style.landingContent}>Vestibulum sed metus in lorem tristique ullamcorper id vitae</p>
              <p className={Style.landingContent}>erat. Nulla mollis sapien sollicitudin lacinia lacinia.</p>
            </div>
          </div>
          {/*
          <DoubleContentBrick theme={ FIRST_BAND_THEME } hasHeader={ false }>
            <Image className="img-responsive" src={iphone}/>
            <ThemePropagator>
            <p className={Style.landingHeader}>So you're going on a trip.</p>
            <p className={Style.landingHeader}>Where do you begin&#63;</p>
            <br/>
            <p className={Style.landingSubHeader}>Meet Someone New</p>
            <p className={Style.landingContent}>Aenean sollicitudin, erat a elementum rutrum, neque sem</p>
            <p className={Style.landingContent}>pretium metus, quis mollis nisl nunc et massa.</p>
            <br/>
            <p className={Style.landingSubHeader}>Find places Easily</p>
            <p className={Style.landingContent}>Vestibulum sed metus in lorem tristique ullamcorper id vitae</p>
            <p className={Style.landingContent}>erat. Nulla mollis sapien sollicitudin lacinia lacinia.</p>
            </ThemePropagator>
          </DoubleContentBrick>
          */}

          <GenericBrick
            backgroundImage={building}>
            <br/>
            <br/>
            <p className={Style.landingHeader2}>Start Exploring</p>
            <br/>
            <p className={Style.landingContent2}>Opportunities to discover new cities</p>
            <p className={Style.landingContent2}>abound with Silk Tours.</p>
            <br/>
            <p className={Style.landingContent2}>Silk tour guides will deliver a personal,</p>
            <p className={Style.landingContent2}>valuable, and communicable</p>
            <p className={Style.landingContent2}>experience while in a destination city.</p>
            <br/>
            <Button className={Style.bannerButton} onClick={this.handleClickExplore}>explore ></Button>
            <br/>
            <br/>
          </GenericBrick>


          <GenericBrick theme={{backgroundColor: "#FFFFFF"}}>
            <p className={Style.landingHeader}>See How it Works</p>
            <br/>
            <ReactPlayer
              className={Style.player}
              url='https://www.youtube.com/watch?v=qcLqPX46Yak'
              width='100%'/>
          </GenericBrick>

          <GenericBrick
            backgroundImage={forrest}>
            <br/>
            <br/>
            <p className={Style.landingHeader3}>Why Guide&#63;</p>
            <br/>
            <p className={Style.landingContent3}>Silk has a simple mission statement: to</p>
            <p className={Style.landingContent3}>foster cultural exchange and inprove</p>
            <p className={Style.landingContent3}>traveling experience by seamlessly</p>
            <p className={Style.landingContent3}>connecting tourists with tour guides.</p>
            <br/>
            <Button className={Style.bannerButton2} onClick={this.handleClick}>apply now ></Button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </GenericBrick>
          {/*
          <EnumerationBrick
            theme={ HEAVY_BAND_THEME }
            subtitle="Silk Tours is the only solution which connects cultures">
            <FeatureItem
              icon="rocket"
              title="Feature 1"
              description="bla bla bla bla bla"
            />
            <FeatureItem
              icon="rocket"
              title="Feature 2"
              description="bla bla bla bla bla"
            />
            <FeatureItem
              icon="rocket"
              title="Feature 3"
              description="bla bla bla bla bla"
            />
          </EnumerationBrick>

          <DoubleContentBrick theme={ LIGHT_BAND_THEME } hasHeader={ false }>
            <p>
              Whether it’s a layover in Los Angeles, a vacation to London, or a day-trip to Miami Beach, opportunities to discover new cities abound. Unfortunately, the classical tourism system is broken. Rigid constructs like travel agencies, bus tours, and hotel excursions all stand between the tourist and a unique, personal experience in a new city. Silk has a simple mission statement: to foster cultural exchange and improve traveling experience by seamlessly connecting tourists with tour guides. Leveraging the ubiquity of mobile devices, Silk is the only mobile application that can connect tourists with crowdsourced tour guides who can deliver a personal, valuable, and communicable experience while in a destination city.
            </p>
            <Image className="img-responsive center-block" src={philadelphiaCityView}/>
          </DoubleContentBrick>
          <DoubleContentBrick theme={ LIGHT_BAND_THEME } hasHeader={ false }>
            <Image className="img-responsive center-block" src={CitySkylineDock}/>
            <p>
              The touring service provided by Silk is crowdsourced by ad-hoc tour guides. These individuals can post a series of tours they are willing to give: A night of bar-hopping, a trip to a sporting event, or a trip to the places that only the locals know about, for instance. Tourists visiting a new city can select from the list of available tours based on their interests. Further, foreign tourists can discover if they speak the same language as their tour guide to influence their decision. In this way, touring a new city becomes significantly more personal and customizable, while also being attractive to tourists from other parts of the world who may not speak the native language of their destination.
            </p>
          </DoubleContentBrick>
          <DoubleContentBrick theme={ LIGHT_BAND_THEME } hasHeader={ false }>
            <p>
              Silk relies on crowdsourced tour guides to create value in the tourism industry by providing person-to-person tours of a destination. The ad-hoc tour guides will be paid directly by the tourist through an in-app payment system and Silk will receive a small remuneration for connecting the two parties, thus generating revenue for our firm. In addition, the worry of immense costs from hiring individual employees in each destination can be forgotten as the tour guides we would connect to tourists will be independent contractors.
            </p>
            <Image className="img-responsive center-block" src={BWcity}/>
          </DoubleContentBrick>
          <DoubleContentBrick theme={ LIGHT_BAND_THEME } hasHeader={ false }>
            <Image className="img-responsive center-block" src={genericCity}/>
            <p>
              Silk will revolutionize the tourism industry. Due to the low cost of entry into the industry, the ease of developing mobile applications for our firm, and nominal operational costs, there are few barriers restricting the feasibility of Silk.
            </p>
          </DoubleContentBrick>

          <StrongMessageBrick
            theme={ HEADER_BAND_THEME }
            messageLevel1="Break your barries and experience culture like a local!"
            CTAs={ <CallToAction label="View Tours!" onClick={this.handleClickExplore}/> }
          />
          */}

        </LandingCanvas>
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
  };
}

export default connect(select)(LandingPage);

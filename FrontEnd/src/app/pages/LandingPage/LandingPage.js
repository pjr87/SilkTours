
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

import ReactPlayer from 'react-player';
import baiada from '../../style/images/baiada.jpg';
import drexel from '../../style/images/drexel.png';
import logoImg1 from '../../style/images/logo1.png';
import logoImg2 from '../../style/images/logo2.png';
import logoImg3 from '../../style/images/logo3.png';
import logoImg5 from '../../style/images/logo5.png';

//heading="News about silk"

//heading="About Company"

//heading="Founders"

//heading="Mission Statement"

//heading="Why we are doing this"

class LandingPage extends React.Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickExplore = this.handleClickExplore.bind(this);
  }

  handleClick (){
    browserHistory.push('/signup');
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

    return (
      <div>
        <BannerImage/>

        <LandingCanvas>
          <StrongMessageBrick
            theme={ HEADER_BAND_THEME }
            messageLevel1="Welcome to Silk Tours!"
            CTAs={ <CallToAction label="Sign Up Now!" onClick={this.handleClick}/> }
          />

          <ReactPlayer
            className={Style.player}
            url='https://www.youtube.com/watch?v=qcLqPX46Yak'
            width='100%'
             />

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
            <Image className="img-responsive center-block" src={logoImg1}/>
          </DoubleContentBrick>
          <DoubleContentBrick theme={ LIGHT_BAND_THEME } hasHeader={ false }>
            <Image className="img-responsive center-block" src={logoImg2}/>
            <p>
              The touring service provided by Silk is crowdsourced by ad-hoc tour guides. These individuals can post a series of tours they are willing to give: A night of bar-hopping, a trip to a sporting event, or a trip to the places that only the locals know about, for instance. Tourists visiting a new city can select from the list of available tours based on their interests. Further, foreign tourists can discover if they speak the same language as their tour guide to influence their decision. In this way, touring a new city becomes significantly more personal and customizable, while also being attractive to tourists from other parts of the world who may not speak the native language of their destination.
            </p>
          </DoubleContentBrick>
          <DoubleContentBrick theme={ LIGHT_BAND_THEME } hasHeader={ false }>
            <p>
              Silk relies on crowdsourced tour guides to create value in the tourism industry by providing person-to-person tours of a destination. The ad-hoc tour guides will be paid directly by the tourist through an in-app payment system and Silk will receive a small remuneration for connecting the two parties, thus generating revenue for our firm. In addition, the worry of immense costs from hiring individual employees in each destination can be forgotten as the tour guides we would connect to tourists will be independent contractors.
            </p>
            <Image className="img-responsive center-block" src={logoImg3}/>
          </DoubleContentBrick>
          <DoubleContentBrick theme={ LIGHT_BAND_THEME } hasHeader={ false }>
            <Image className="img-responsive center-block" src={logoImg5}/>
            <p>
              Silk will revolutionize the tourism industry. Due to the low cost of entry into the industry, the ease of developing mobile applications for our firm, and nominal operational costs, there are few barriers restricting the feasibility of Silk.
            </p>
          </DoubleContentBrick>

          <StrongMessageBrick
            theme={ HEADER_BAND_THEME }
            messageLevel1="Break your barries and experience culture like a local!"
            CTAs={ <CallToAction label="View Tours!" onClick={this.handleClickExplore}/> }
          />

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

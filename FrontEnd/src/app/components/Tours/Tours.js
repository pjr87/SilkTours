import React from 'react';
import { Link } from 'react-router';
import style from './style.css';

import {Col, Thumbnail, Button, Image} from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

import {connect} from 'react-redux';

class Tours extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      showTourInfo: false,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    this.cancelTourEvent = this.cancelTourEvent.bind(this);
  }

  mouseOver = () => {
    this.setState({showTourInfo: true});
  }
  mouseOut() {
    this.setState({showTourInfo: false});
  }


  cancelTourEvent(tourEventId, isGuide){
    console.log(tourEventId, " ", isGuide);
    console.log("CLICKED");
  }

  render(){
    //const guidesLength = this.state.guides.length;
    let tourDisplay = null;
    console.log("display", this.props.tourDisplayProps);

    const modifyBtn = (this.props.tourDisplayProps.modifyBtn) ? (<p>
        <Link
          to={{
            pathname: '/tourModify',
            query: { tourId: this.state.id_tour }
          }}>
          <Button bsStyle="primary">Modify</Button>&nbsp;
        </Link>
      </p>) : null;

    const contactGuideBtn = (this.props.tourDisplayProps.contactGuideBtn) ? (<p>
        <Link
          to={{
            pathname: '/messages',
            query: { tourId: this.state.id_tour }
          }}>
          <Button bsStyle="primary">Message Guide</Button>&nbsp;
        </Link>
      </p>) : null;

      const summaryBtn = (this.props.tourDisplayProps.summaryBtn) ? (<p>
          <Link
            to={{
              pathname: '/messages',
              query: { tourId: this.state.id_tour }
            }}>
            <Button bsStyle="primary">Review Summary</Button>&nbsp;
          </Link>
        </p>) : null;

      const contactTouristBtn = (this.props.tourDisplayProps.contactTouristBtn) ? (<p>
          <Link
            to={{
              pathname: '/messages',
              query: { tourId: this.state.id_tour }
            }}>
            <Button bsStyle="primary">Message Tourist</Button>&nbsp;
          </Link>
        </p>) : null;


      const cancelBtn = (this.props.tourDisplayProps.cancelBtn) ? (
              <Button bsStyle="primary" onClick={() => this.cancelTourEvent(this.props.tour.id_tourEvent, this.props.tourDisplayProps.isGuide)}>Cancel Booking</Button>
              ) : null;


      console.log("Tour: ", this.props.tour);

      let contactButton = null;
      if(!this.props.loggedIn)
      {
        contactButton = <Link
                      to={{
                        pathname: '/sign'
                        }}>
                        <Button bsStyle="default">Message</Button>
                      </Link>;
      }else if( this.props.tourDisplayProps.isGuide && this.props.tour.participants != null && this.props.tour.participants.length > 0 )
      {
        contactButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.props.tour.participants[0].id_users }
                        }}>
                        <Button bsStyle="primary">Message</Button>
                      </Link>;
      }else if( !this.props.tourDisplayProps.isGuide )
      {
        contactButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.props.tour.guides[0].id_user }
                        }}>
                        <Button bsStyle="primary">Message</Button>
                      </Link>;
      }else
      {
        contactButton = null;
      }


      let guideButton = null;
    if (this.props.tour.guides != null && this.props.tour.guides.length != '0') {
      if(this.props.loggedIn) {
        guideButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.props.tour.guides[0].id_user }
                        }}>
                        <Button bsStyle="primary">Message</Button>
                      </Link>;
      }
      else {
        guideButton = <Link
                      to={{
                        pathname: '/sign'
                        }}>
                        <Button bsStyle="primary">Message</Button>
                      </Link>;
      }
    } else {
      guideButton = null;
    }


    if(this.props.tourDisplayProps.display == "small"){





      tourDisplay = (
        <Col xs={12} md={6} lg={6}>
          <Thumbnail src={this.props.tour.profile_image} >
            <div>
            <p>{this.props.tour.name}</p>
            <p>review: </p>
            <p>price: ${this.props.tour.price}</p>
            <div className={style.buttonContainer}>
              <Link
                to={{
                  pathname: '/tourdetail',
                  query: { tourId: this.props.tour.id_tour }
                }}>
                <Button bsStyle="primary">More Info</Button>&nbsp;
              </Link>

            {modifyBtn} {contactButton} {summaryBtn} {contactTouristBtn} {cancelBtn}</div>
            </div>
          </Thumbnail>
        </Col>);



    } 
    else{

      tourDisplay = (
      <Col xs={12} md={4} lg={3}>
        <Thumbnail>
          <div onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
            {this.state.showTourInfo ? (<Image className={style.tour_image_large_info} src={this.props.tour.profile_image}/>) : (<Image className={style.tour_image_large} src={this.props.tour.profile_image}/>)}
          </div>
          <p>{this.props.tour.name}</p>
          <p>${this.props.tour.price}</p>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={this.props.tour.average_rating}
            renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
          />
        {this.props.tour.rating_count} reviews
          <p>
            <Link
              to={{
                pathname: '/tourdetail',
                query: { tourId: this.props.tour.id_tour }
              }}>
              <Button bsStyle="primary">More Info</Button>&nbsp;
            </Link>
            {guideButton}
          </p>
        </Thumbnail>
      </Col>);
    }


    /*let guideButton = null;
    if (guidesLength != '0') {
      if(this.props.loggedIn) {
        guideButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.state.guides[0].id_user }
                        }}>
                        <Button bsStyle="default">Message</Button>
                      </Link>;
      }
      else {
        guideButton = <Link
                      to={{
                        pathname: '/sign'
                        }}>
                        <Button bsStyle="default">Message</Button>
                      </Link>;
      }
    } else {
      guideButton = null;
    }*/
    return (<div>
      {tourDisplay}
    </div>);
  }
}

function select (state) {
  return {
    loggedIn: state.AuthReducer.loggedIn,
    selectedTour: state.TourDetailReducer.selectedTour
  };
}

export default connect(select)(Tours);

import React from 'react';
import { Link } from 'react-router';
import style from './style.css';
import {Confirm} from 'components';

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
  }

  mouseOver = () => {
    this.setState({showTourInfo: true});
  }
  mouseOut() {
    this.setState({showTourInfo: false});
  }


  render(){
    //const guidesLength = this.state.guides.length;
    let tourDisplay = null;

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

    let containsParticipants = false;
    if( this.props.tour.participants != null )
    {
      if( this.props.tour.participants.length > 0 )
      {
        containsParticipants = true;
      }
    }
    
      const cancelTourBody =  <div>
                                Are you sure you want to delete the following scheduled tour?
                                <div className={style.confirmBody}>
                                  <p><span className={style.confirmBodySideHeader}>Name:</span> {this.props.tour.name}</p>
                                  <p><span className={style.confirmBodySideHeader}>Start Time:</span> {this.props.tour.start_date_time}</p>
                                  <p><span className={style.confirmBodySideHeader}>End Time:</span> {this.props.tour.end_date_time}</p>
                                  
                                  { this.props.tourDisplayProps.isGuide && containsParticipants &&
                                  <p>
                                    <span className={style.confirmBodySideHeader}>Tourist:</span> 
                                      {this.props.tour.participants[0].first_name + " " + this.props.tour.participants[0].last_name}
                                  </p>
                                  }

                                  { !this.props.tourDisplayProps.isGuide && this.props.tour.guides != null && this.props.tour.guides.length > 0 &&
                                  <p>
                                    <span className={style.confirmBodySideHeader}>Guide:</span> 
                                      {this.props.tour.guides[0].first_name + " " + this.props.tour.guides[0].last_name}
                                  </p>
                                  }

                                </div>
                              </div>;
      console.log();
      const cancelBtn = (this.props.tour.state != "D" && this.props.tourDisplayProps.cancelBtn) ? (
          <Confirm
          onConfirm={()=>this.props.cancelTourEvent(this.props.tour.id_tourEvent, this.props.tourDisplayProps.isGuide)}
          body={cancelTourBody}
          confirmText="Cancel Tour"
          title="Tour Cancellation">
          <Button className={style.buttonWidth} bsStyle="primary">Cancel</Button>
          </Confirm>              
              ) : null;

      
      console.log("Tour: ", this.props.tour);

      let contactButton = null;
      if(this.props.tourDisplayProps.messageButton != false)
      {
        if(!this.props.loggedIn)
        {
          contactButton = <Link
                        to={{
                          pathname: '/sign'
                          }}>
                          <Button className={style.buttonWidth} bsStyle="default">Message</Button>
                        </Link>;
        }else if( this.props.tourDisplayProps.isGuide && this.props.tour.participants != null && this.props.tour.participants.length > 0 )
        {
          contactButton = <Link
                        to={{
                          pathname: '/messages',
                          query: { guideUserId: this.props.tour.participants[0].id_users }
                          }}>
                          <Button className={style.buttonWidth} bsStyle="primary">Message</Button>
                        </Link>;
        }else if( !this.props.tourDisplayProps.isGuide && this.props.tour.guides != null && this.props.tour.guides.length > 0)
        {
          contactButton = <Link
                        to={{
                          pathname: '/messages',
                          query: { guideUserId: this.props.tour.guides[0].id_user }
                          }}>
                          <Button className={style.buttonWidth} bsStyle="primary">Message</Button>
                        </Link>;
        }else
        {
          contactButton = null;
        }
      }
      


      let guideButton = null;
    if (this.props.tour.guides != null && this.props.tour.guides.length > 0) {
      if(this.props.loggedIn) {
        guideButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.props.tour.guides[0].id_user }
                        }}>
                        <Button className={style.buttonWidth} bsStyle="primary">Message</Button>
                      </Link>;
      }
      else {
        guideButton = <Link
                      to={{
                        pathname: '/sign'
                        }}>
                        <Button className={style.buttonWidth} bsStyle="primary">Message</Button>
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
            <p>{this.props.tour.name}  {this.props.tour.id_tourEvent}</p>
            { this.props.tourDisplayProps.isGuide && this.props.tour.participants != null && this.props.tour.participants.length > 0 && 
              <p>
                <span className={style.confirmBodySideHeader}>Tourist: </span>
                  {this.props.tour.participants[0].first_name + " " + this.props.tour.participants[0].last_name}
              </p>
            }

            { !this.props.tourDisplayProps.isGuide && this.props.tour.guides != null && this.props.tour.guides.length > 0 &&
              <p>
                <span className={style.confirmBodySideHeader}>Guide:</span> 
                  {this.props.tour.guides[0].first_name + " " + this.props.tour.guides[0].last_name}
              </p>
            }
            <div className={style.buttonContainer}>
              <Link
                to={{
                  pathname: '/tourdetail',
                  query: { tourId: this.props.tour.id_tour }
                }}>
                <Button bsStyle="primary" className={style.buttonWidth}>More Info</Button>&nbsp;
              </Link>

            {modifyBtn} {contactButton} {summaryBtn} {contactTouristBtn} {cancelBtn}</div>
            </div>
          </Thumbnail>
          </Col>);



    } 
    else{

      tourDisplay = (
      <div xs={12} md={4} lg={3}>
        <Thumbnail>
          <div onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
            {this.state.showTourInfo ? (<Image className={style.tour_image_large_info} src={this.props.tour.profile_image}/>) : (<Image className={style.tour_image} src={this.props.tour.profile_image}/>)}
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
      </div>);
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
